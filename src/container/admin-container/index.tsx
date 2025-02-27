import AdminMessageBody from '@/components/admin-messages';
import Title from '@/components/header/title';
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa6';
import "./style.css"
const AdminContainer = () => {
    return (
        <div className='admin-container'>
            <Title
                header='Admin Message'
                context='Manage messages with your customers here'
                icon={<FaWhatsapp size={30}/>}
            />
            <AdminMessageBody/>
        </div>
    );
}

export default AdminContainer;
