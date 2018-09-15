import React from 'react';
import {Link} from 'react-router-dom';

export default class Statslist extends React.Component{

    render(){

        if(!this.props  === undefined ){
            return null   
        }

        console.log('STATS PROPS',this.props);
      
        return (
            <ul className="score_list" aria-live="polite">
           {
            this.props.wordList.map(word=>{
              
                return (
                <li className="board-list-item" key={word}  >
                   {word.lapineWord} : {Math.floor(word.percentCorrect)} % 
                    {/* <h2><Link to={`/moodboards/${moodboardId}`} title={this.props.moodboards[moodboardId].board_name}>{this.props.moodboards[moodboardId].board_name}     </Link> </h2>
                      <div className="board-description"><p>{this.props.moodboards[moodboardId].description}</p></div>
                        <div className="edit-moodboard" style={this.state}>
                            <EditMoodboardForm boardname={this.props.moodboards[moodboardId].board_name} description={this.props.moodboards[moodboardId].description} deleteMoodboard={this.props.deleteMoodboard} form={`editform_${moodboardId}`} moodboardId={moodboardId} userId={this.props.userId}/> 
                        </div>
                       */}
                </li>
                )
            })
           } 
           </ul>
    );
  } 
}
