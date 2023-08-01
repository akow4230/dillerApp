import React, { useState } from 'react';
import Filter from './Filter'
function TestKeraksiz(props) {

    return (
        <div className='container'>
            <h1>Filter </h1>
            <div className=''>
                <Filter obj={['active', 'city', 'weekDays','customerCategories', 'tin','week', 'quickSearch']}/>
            </div>
        </div>
    );
}

export default TestKeraksiz;
