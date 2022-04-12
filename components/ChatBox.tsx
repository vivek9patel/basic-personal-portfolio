import {
    useHMSStore,
    selectHMSMessages,
    HMSMessage,
    useHMSActions,
    useHMSNotifications,
    HMSNotificationTypes
} from '@100mslive/react-sdk';
import { useEffect, useRef, useState } from 'react';
import { BiChat } from 'react-icons/bi';
import Linkify from 'react-linkify';

function ChatWidget() {
  const [chatOpen, isChatOpen] = useState<boolean>(false);
    const [isUnreadChat, setIsUnreadChat] = useState<boolean>(false);    

  const notification = useHMSNotifications();

  useEffect(() => {
      if (notification) {
        switch (notification.type) {
            case HMSNotificationTypes.NEW_MESSAGE:
                if(!chatOpen) setIsUnreadChat(true)
                break;
            default:
                break;
        }
      }

  }, [notification]);

  useEffect(() => {
    if(chatOpen){
        setIsUnreadChat(false)
    }
  }, [chatOpen])

  const toggleChatBox = () => {
    isChatOpen(!chatOpen);
  }
    return (
        <div className='relative'>
        {chatOpen && <ChatBox />}
        <button title={`${chatOpen ? "Close" : "Open"} Chat`} className={`${chatOpen ? "bg-v9-pink" : ""} relative h-10 w-10 flex justify-center items-center rounded-full shadow-lg transition duration-300 ease-in-out`} onClick={toggleChatBox}>
            {
                isUnreadChat && <div className='h-3 w-3 bg-v9-pink rounded-full absolute right-0 top-0 '></div>
            }
            <BiChat color={`${chatOpen ? "white" : ""}`} size={24} />
        </button>
        </div>
    )
}

function ChatBox() {

    const chatBoxRef = useRef<HTMLDivElement>(null);

    const [chatMessage, setChatMessage] = useState<string>('');
    const allMessages = useHMSStore(selectHMSMessages); // get all messages
    
    const hmsActions = useHMSActions();
    
    const broadCastChat = () => {
        hmsActions.sendBroadcastMessage(chatMessage);
        setChatMessage('');
    }

    useEffect(() => {
        scrollToBottom();
    }, [allMessages])

    const scrollToBottom = () => {
        const chatBox = chatBoxRef.current;
        if(chatBox) chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }

    return (
        <div className='absolute bottom-full w-96 h-96 bg-white rounded-lg shadow-lg left-0 mb-2 border-2 flex flex-col justify-end'>
            <div ref={chatBoxRef} className='flex flex-col flex-1 p-4 overflow-y-scroll overflow-x-hidden'>
                {allMessages.map((msg) => (
                    <Message key={msg.id} message={msg} />
                ))}
            </div>
            <form onSubmit={(e) => {
                e.preventDefault();
                broadCastChat()
            }}>
                <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    required
                    minLength={1}
                    className="
                        block
                        w-full
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding 
                        border-t-2 border-solid border-gray-300 
                        rounded-sm
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-700 focus:outline-none
                    "
                    placeholder="Enter your Message"
                />
            </form>
        </div>
    );
}

type MessageProps = {
    message: HMSMessage;
}

const Message = ({message}: MessageProps) => {
    return (
        <div className='flex flex-col text-left w-full justify-center items-start mt-2 border-b pb-1'>
            <div className='text-sm text-gray-600'>{message.senderName}</div>
            <div className='flex text-left w-full justify-between items-end'>
                <div className='text-gray-900 flex-1 break-words min-w-0 mr-1 chat-message'>
                    <Linkify>
                        {message.message}
                    </Linkify>
                </div>
                <div className=' text-gray-600 text-xs w-max'>{message.time.toLocaleTimeString('en-US', {timeZone:'IST', hour12:true, hour:'numeric', minute:'numeric'})}</div>
            </div>
        </div>
    )
}

export default ChatWidget