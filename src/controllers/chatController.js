// controllers/chatController.js
export const chatBot = async (req, res) => {
    try {
      const { message } = req.body;
  
      if (!message) {
        return res.status(400).json({ status: "error", message: "الرسالة مطلوبة" });
      }
  
      const lowerMessage = message.toLowerCase();
      let reply = "عذرًا، لم أفهم سؤالك. حاول إعادة صياغته.";
  
      if (lowerMessage.includes("نوبة")) {
        reply = "في حالة حدوث نوبة، تأكد من حماية المريض من الإصابة، لا تضع شيئًا في فمه، واتصل بالطوارئ إذا استمرت النوبة أكثر من 5 دقائق.";
      } else if (lowerMessage.includes("الدواء")) {
        reply = "يرجى تناول الأدوية في مواعيدها بدقة، وتواصل مع الطبيب في حال ظهور أي أعراض جانبية.";
      } else if (lowerMessage.includes("إسعاف") || lowerMessage.includes("أولية")) {
        reply = "الإسعافات الأولية تشمل وضع المريض على جانبه، إبعاد أي أجسام صلبة، ومتابعة التنفس.";
      } else if (lowerMessage.includes("صرع")) {
        reply = "الصرع هو اضطراب عصبي يسبب نوبات كهربائية غير طبيعية في الدماغ، ويتطلب متابعة طبية دقيقة.";
      }
  
      res.status(200).json({ status: "success", message: reply });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  };
  