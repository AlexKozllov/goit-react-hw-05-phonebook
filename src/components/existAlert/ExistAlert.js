import React from 'react';

import s from './existAlert.module.css';

const ExistAlert = () => {
    return (
        <div className={s.box}>
            <h4>Warning</h4>
            <p>Contact is already exist</p>
        </div>
    );
}

export default ExistAlert;