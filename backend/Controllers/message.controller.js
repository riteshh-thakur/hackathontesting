import Message from '../Models/Chat.model.js'


// Create and Save a new Message
export const create = async (req, res) => {
    if (!req.body.content) {
        return res.status(400).send({
            message: "Message content can not be empty"
        });
    }

    try {
        const message = new Message({
            message: req.body.content,
            sender: req.body.sender,
            reciever: req.body.reciever,
            chat: req.body.chatid
        });

        const data = await message.save();
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Message."
        });
    }
};

// Retrieve and return all messages from the database.
export const findAll = async (request, response) => {
    const chatid = request.query.chatid;
    try {
        const messages = await Message.find({chat:chatid})
       return response.status(200).send({messages});
    } catch (err) {
      return  response.status(500).send({
            message: err.message || "Some error occurred while retrieving messages."
        });
    }
};

// Find a single message with a messageId
