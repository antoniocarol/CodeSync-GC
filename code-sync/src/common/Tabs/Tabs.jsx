import React, { useState, useEffect, useRef } from 'react';
import { Stage, Layer, Line, Text, Rect, Image } from 'react-konva';
import Draggable from 'react-draggable';
import useImage from 'use-image';
import './Tabs.css';

const Tabs = () => {
    const [activeTab, setActiveTab] = useState('chat');
    const [lines, setLines] = useState([]);
    const [texts, setTexts] = useState([]);
    const [rects, setRects] = useState([]);
    const [images, setImages] = useState([]);
    const [selectedTool, setSelectedTool] = useState('pen');
    const [selectedColor, setSelectedColor] = useState('#df4b26');
    const [editingTextId, setEditingTextId] = useState(null);
    const isDrawing = useRef(false);
    const stageRef = useRef(null);
    const containerRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.offsetWidth,
                    height: containerRef.current.offsetHeight,
                });
            }
        };
        window.addEventListener('resize', updateDimensions);
        updateDimensions();
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleMouseDown = () => {
        if (selectedTool !== 'pen') return;
        isDrawing.current = true;
        const pos = stageRef.current.getPointerPosition();
        setLines([...lines, { points: [pos.x, pos.y], color: selectedColor }]);
    };

    const handleMouseMove = (e) => {
        if (!isDrawing.current) return;
        const stage = stageRef.current;
        const point = stage.getPointerPosition();
        let lastLine = lines[lines.length - 1];
        lastLine.points = lastLine.points.concat([point.x, point.y]);

        lines.splice(lines.length - 1, 1, lastLine);
        setLines(lines.concat());
    };

    const handleMouseUp = () => {
        if (selectedTool !== 'pen') return;
        isDrawing.current = false;
    };

    const handleAddText = () => {
        const pos = stageRef.current.getPointerPosition();
        setTexts([...texts, { id: texts.length, x: pos.x, y: pos.y, text: 'Novo Texto' }]);
    };

    const handleAddRect = () => {
        const pos = stageRef.current.getPointerPosition();
        setRects([...rects, { x: pos.x, y: pos.y, width: 100, height: 100, fill: '#9ee3ff' }]);
    };

    const handleAddImage = (url) => {
        const pos = stageRef.current.getPointerPosition();
        const [image] = useImage(url);
        setImages([...images, { x: pos.x, y: pos.y, image }]);
    };

    const handleClear = () => {
        setLines([]);
        setTexts([]);
        setRects([]);
        setImages([]);
    };

    const handleUploadImage = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            handleAddImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleTextClick = (id) => {
        setEditingTextId(id);
    };

    const handleTextChange = (id, text) => {
        const newTexts = texts.map((t) => (t.id === id ? { ...t, text } : t));
        setTexts(newTexts);
    };

    const handleTextDblClick = (e, id) => {
        const textNode = e.target;
        const stage = stageRef.current;
        const layer = textNode.getLayer();

        textNode.hide();
        layer.draw();

        const textPosition = textNode.absolutePosition();

        const stageBox = stage.container().getBoundingClientRect();

        const areaPosition = {
            x: stageBox.left + textPosition.x,
            y: stageBox.top + textPosition.y,
        };

        const textarea = document.createElement('textarea');
        document.body.appendChild(textarea);

        textarea.value = textNode.text();
        textarea.style.position = 'absolute';
        textarea.style.top = `${areaPosition.y}px`;
        textarea.style.left = `${areaPosition.x}px`;
        textarea.style.width = `${textNode.width()}px`;

        textarea.focus();

        const removeTextarea = () => {
            textarea.parentNode.removeChild(textarea);
            window.removeEventListener('click', handleOutsideClick);
            textNode.show();
            layer.draw();
        };

        const setTextareaWidth = (newWidth) => {
            const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
            const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

            if (isSafari || isFirefox) {
                newWidth = Math.ceil(newWidth);
            }

            const isEdge = document.documentMode || /Edge/.test(navigator.userAgent);
            if (isEdge) {
                newWidth += 1;
            }
            textarea.style.width = `${newWidth}px`;
        };

        textarea.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                handleTextChange(id, textarea.value);
                removeTextarea();
            }
            if (e.key === 'Escape') {
                removeTextarea();
            }
        });

        textarea.addEventListener('keydown', (e) => {
            const scale = textNode.getAbsoluteScale().x;
            setTextareaWidth(textNode.width() * scale);
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        });

        const handleOutsideClick = (e) => {
            if (e.target !== textarea) {
                handleTextChange(id, textarea.value);
                removeTextarea();
            }
        };
        setTimeout(() => {
            window.addEventListener('click', handleOutsideClick);
        });
    };

    return (
        <div className="tabs-container">
            <div className="tabs">
                <div
                    className={`tab ${activeTab === 'chat' ? 'active' : ''}`}
                    onClick={() => handleTabClick('chat')}
                >
                    Call Chat
                </div>
                <div
                    className={`tab ${activeTab === 'board' ? 'active' : ''}`}
                    onClick={() => handleTabClick('board')}
                >
                    Call Board
                </div>
            </div>
            <div className="tab-content" ref={containerRef}>
                {activeTab === 'chat' && <div>Conteúdo do Call Chat</div>}
                {activeTab === 'board' && (
                    <div className="canvas-container">
                        <Draggable bounds="parent">
                            <div className="menu" id="draggable-menu">
                                <button onClick={handleAddText}>Adicionar Texto</button>
                                <button onClick={handleAddRect}>Adicionar Post-it</button>
                                <input type="file" onChange={handleUploadImage} />
                                <button onClick={() => setSelectedTool('pen')}>Lápis</button>
                                <button onClick={handleClear}>Apagar Tudo</button>
                                <label htmlFor="color-picker">Cor:</label>
                                <input
                                    type="color"
                                    id="color-picker"
                                    value={selectedColor}
                                    onChange={(e) => setSelectedColor(e.target.value)}
                                />
                            </div>
                        </Draggable>
                        <Stage
                            width={dimensions.width}
                            height={dimensions.height}
                            onMouseDown={handleMouseDown}
                            onMousemove={handleMouseMove}
                            onMouseup={handleMouseUp}
                            ref={stageRef}
                        >
                            <Layer>
                                {lines.map((line, i) => (
                                    <Line
                                        key={i}
                                        points={line.points}
                                        stroke={line.color}
                                        strokeWidth={2}
                                        tension={0.5}
                                        lineCap="round"
                                    />
                                ))}
                                {texts.map((text, i) => (
                                    <Text
                                        key={i}
                                        x={text.x}
                                        y={text.y}
                                        text={text.text}
                                        fontSize={20}
                                        draggable
                                        onClick={() => handleTextClick(text.id)}
                                        onDblClick={(e) => handleTextDblClick(e, text.id)}
                                    />
                                ))}
                                {rects.map((rect, i) => (
                                    <Rect
                                        key={i}
                                        x={rect.x}
                                        y={rect.y}
                                        width={rect.width}
                                        height={rect.height}
                                        fill={rect.fill}
                                        draggable
                                    />
                                ))}
                                {images.map((image, i) => (
                                    <Image key={i} x={image.x} y={image.y} image={image.image} draggable />
                                ))}
                            </Layer>
                        </Stage>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Tabs;
