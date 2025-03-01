import Title from '@/components/header/title';
import ModuleBody from '@/components/module-body';
import React from 'react';
import { FaDatabase } from 'react-icons/fa6';

const ModuleContainer = () => {
    return (
        <div className='module-container'>
            <Title
                header='Module Training'
                context='Train and Optimized  your model here'
                icon={<FaDatabase size={30}/>}
            />
            {/* Module Body */}

            <ModuleBody/>
        </div>
    );
}

export default ModuleContainer;
