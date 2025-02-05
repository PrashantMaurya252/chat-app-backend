import  { Conversation } from "../models/conversationModel.js"
import { Message } from "../models/messageModel.js"
import { getReceiverSocketId, io } from "../socket/socket.js"

export const sendMessage = async(req,res)=>{
    try {
        const senderId = req.id
        const receiverId = req.params.id
        const {message} = req.body
        

        let conversation = await Conversation.findOne({
            participants:{$all:[senderId,receiverId]}
        })

        if(!conversation){
            conversation = await Conversation.create({
                participants:[senderId,receiverId]
            })
        }
        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        });

        if(newMessage) conversation.messages.push(newMessage._id);
        await Promise.all([conversation.save(),newMessage.save()])

        // implement socket io

        const receiverSocketId = getReceiverSocketId(receiverId)

        if(receiverSocketId){
            io.to(receiverSocketId).emit('newMessage',newMessage)
        }



        return res.status(201).json({
            success:true,
            newMessage
        })
    } catch (error) {
        console.log(error,'sendMessage api error')
    }
}

export const getMessage = async(req,res)=>{
    try {
        const senderId = req.id
        const receiverId = req.params.id;
        const conversation = await Conversation.findOne({
            participants:{$all:[senderId,receiverId]}
        }).populate('messages')
        if(!conversation) return res.status(200).json({success:true,messages:[]})

        return res.status(200).json({
            success:true,messages:conversation?.messages
        })
    } catch (error) {
        console.log(error,'getMessage api error')
    }
}