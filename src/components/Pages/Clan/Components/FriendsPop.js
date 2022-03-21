import React from 'react';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone, faPaperclip, faChevronDown, faCamera} from '@fortawesome/free-solid-svg-icons'
import { faSmile } from '@fortawesome/free-regular-svg-icons'

class FriendsPop extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            friendsPops: this.props.pops,
            lastinserted: this.props.lastinserted,
            selectedIndex: 0
        }

        this.closeSelectedChat = this.closeSelectedChat.bind(this);
        this.selectNewChat = this.selectNewChat.bind(this);

        
    }

    setNewindex(friendslistActive){
        this.setState({selectedIndex: friendslistActive});
    }

    seeActiveChat(){
        let friendslistActive = (this.props.pops.length > 0 ? this.props.pops.length - 1 : 0);
        console.log(this.state.friendsPops);
        console.log(this.props.lastinserted);
    }

    componentDidUpdate(){
        // this.seeActiveChat();
    }

    closeSelectedChat(){
        this.props.closePop(true)
    }

    selectNewChat(i){
        this.props.openPops(i)
    }

    componentDidMount(){
        
    }

    render () {
        
        return (
            <div className="d-open-new-message">
                
                <div className='d-open-message-info'>
                    {
                        this.props.lastinserted !== null ? 
                            <div className='d-pop-list-message'>
                                <div className='d-open-new-message-inner' >
                                    <div className='d-new-message-container'>
                                        <div className='d-open-header'>
                                            <div className='d-image-part'>
                                                <img src={this.props.lastinserted.img} alt="" /> 
                                            </div>
                                            <div className='d-image-info'>
                                                <div className='d-header-top'>{this.props.lastinserted.name}</div>
                                                <div className='d-header-subtop'>Friend</div>
                                            </div>
                                            <div className='d-image-options' >
                                                <div className='d-opt-two doptbase'>
                                                    <button onClick={() => this.closeSelectedChat()}><FontAwesomeIcon icon={faChevronDown} /></button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='d-open-content'>
                                            <div className='d-content-inner'>
                                                <div className='d-content-greybar'>Goal: Healthy Spirits</div>
                                                <div className='d-main-content'>
                                                    {
                                                        this.props.lastinserted.messages.map((itm, im) => (
                                                            <div className={"ismessage "+(itm.type == 'in' ? 'incomming-message' : 'outgoing-message')} key={im}>
                                                                <div className='ismessage-inner'>{itm.message}</div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className='d-open-footer'>
                                            <div className='d-open-addtext'>
                                                <div className='d-smiley'><FontAwesomeIcon icon={faSmile} /></div>
                                                <div className='d-showtext'><textarea name="" id="" cols="30" rows="10"></textarea></div>
                                                <div className='d-attach'><FontAwesomeIcon icon={faPaperclip} /></div>
                                                <div className='d-mic'><FontAwesomeIcon icon={faMicrophone} /></div>
                                                <div className='d-photo'><FontAwesomeIcon icon={faCamera} /></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        :
                            <div style={{display: 'none'}}>has no values</div>
                    }
                    
                </div>
                <div className='d-open-heads-list'>
                    { this.state.friendsPops.map((item, i) => (
                        <div className='d-pop-list-base' key={i}  onClick={() => this.selectNewChat(i)}>
                            <div className='d-pop-up-head' style={(!item.is_open ? {display: 'block'} : {display: 'none'})}>
                                <div className='d-pop-up-head-inner'>
                                    <img src={item.img} alt="" />   
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default FriendsPop