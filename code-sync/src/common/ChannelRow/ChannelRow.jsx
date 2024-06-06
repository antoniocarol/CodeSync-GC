import React, { useState, useEffect } from 'react';
import PlusSign from '../../assets/plusSign.svg';
import ChevronOpen from '../../assets/chevronOpen.svg';
import ChevronClose from '../../assets/chevronClose.svg';
import ChatIcon from '../../assets/chat.svg';
import AnonAvatar from '../../assets/anonAvatar.svg';
import AvailableCallIcon from '../../assets/availableCall.svg';
import Modal from 'react-modal';
import './ChannelRow.css';

const ChannelRow = ({ title, isAdding = false, isTextChannel = false, isCallChannel = false, isUserDisplayer = false, users = [] }) => {
    const [open, setOpen] = useState(true);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [newChannelName, setNewChannelName] = useState('');
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        const savedChannels = JSON.parse(localStorage.getItem('textChannels')) || [];
        setChannels(savedChannels);
    }, []);

    const handleClick = () => {
        setOpen(!open);
    }

    const handleOpenModal = () => {
        setModalIsOpen(true);
    }

    const handleCloseModal = () => {
        setModalIsOpen(false);
        setNewChannelName('');
    }

    const handleSaveChannel = () => {
        const updatedChannels = [...channels, newChannelName];
        setChannels(updatedChannels);
        localStorage.setItem('textChannels', JSON.stringify(updatedChannels));
        handleCloseModal();
    }

    return (
        <div className='overall-wrapper'>
            <div className={`wrapper-row ${open ? 'open' : ''}`}>
                <div className='row' onClick={handleClick}>
                    <img src={open ? ChevronOpen : ChevronClose} alt="Chevron" className='chevron-button'></img>
                    <h2 className='small-space'>{title}</h2>
                </div>
                {isAdding && open && (
                    <img src={PlusSign} onClick={handleOpenModal} className='plus-button' alt="Plus"></img>
                )}
            </div>
            {isTextChannel && open && (
                <div className={`channel-list ${open ? 'open' : ''}`}>
                    {channels.map((channel, index) => (
                        <div key={index} className='channel-item'>
                            # {channel}
                        </div>
                    ))}
                </div>
            )}
            {isUserDisplayer && open && (
                <div className={`channel-list users ${open ? 'open' : ''}`}>
                    {users.map((user, index) => (
                        <div key={index} className='user-item'>
                            <div className='avatar-wrapper'>
                                <img src={user.avatar ?? AnonAvatar} alt="User Avatar" className='user-avatar' />
                                <div className={`status-dot ${user.isOnline ? 'online' : 'offline'}`}></div>
                            </div>
                            <span className='user-name'>{user.name}</span>
                            <img src={ChatIcon} alt="Chat Icon" className='user-icon' />
                            <img src={AvailableCallIcon} alt="Call Icon" className={`user-icon ${user.inCall ? 'in-call' : ''}`} />
                        </div>
                    ))}
                </div>
            )}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={handleCloseModal}
                contentLabel="Add New Channel"
                className="modal"
                overlayClassName="overlay"
            >
                <h2>Adicionar Novo Canal de Texto</h2>
                <input
                    type="text"
                    value={newChannelName}
                    onChange={(e) => setNewChannelName(e.target.value)}
                    placeholder="Nome do Canal"
                    className="input"
                />
                <button onClick={handleSaveChannel} className="button">Salvar</button>
                <button onClick={handleCloseModal} className="button">Cancelar</button>
            </Modal>
        </div>
    );
};

export default ChannelRow;
