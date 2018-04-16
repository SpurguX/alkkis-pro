import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class DiaryTable extends Component {

    componentDidMount() {
       
    }

    render() {
        return(
            <div id="diary-table-container" className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Pvm</th>
                            <th>Annokset</th>
                            <th>Juoma</th>
                            <th>Kappalemäärä</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>

           
        )
    }
}

function mapStateToProps(state) {
    return {
        drinks: state.drinks,
        drinkList: state.drinkList
    };
}

function mapDispatchToProps(dispatch) {
   
}

export default connect(mapStateToProps, null)(DiaryTable);

