import React, { Component } from 'react';
import AddToDiaryBtn from './add_to_diary_btn';
import EmptyDrinkListBtn from './empty_drink_list_btn.js';

export default class DrinkListButtons extends Component {

    render() {
        return (
            <div className="row justify-content-center">
                <AddToDiaryBtn />
                <EmptyDrinkListBtn />
            </div>
        )
    }
}
