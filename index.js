import express from "express";
const app = express();
import { connectDB } from "./db.js";
import { Card } from "./models/Cards.js";
app.use(express.json());
connectDB();

app.post("/cards", async (req, res) => {
  try {
    console.log(req.body);
    const card = await Card.create(req.body);
    console.log(card);
    res.status(201).json({ Card }).send("Card create succesfully");
  } catch (error) {}
});

app.get("/hola", (req, res) => {
  res.status(200).send("hello world form a server!!!");
});

app.post("/send", (req, res) => {
  const { user, email } = req.body;
  console.log("datos recobidos" + user + " " + email);
  res.status(200).send("data recibed susesflly");
});

app.listen(3000, () => {
  console.log("Servidor Ejecutandose servidor en http://localhost:3000");
});

app.post("/createCard", async (req, res) => {
  try {
    const card = await Card.create(req.body);
    console.log(card);
    res.status(201).json(card).send("Card created successfully");
  } catch (error) {
    console.error(error);
    res.status(400).send("Error creating card");
  }
});

app.get("/getAllCards", async (req, res) => {
  try {
    const cards = await Card.find();
    res.status(200).json(cards);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving cards");
  }
});
app.get("/getCard/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cards = await Card.findById(id);
    if (!cards) {
      return res.status(404).json({ message: "Card not found" });
    }
    res.status(200).json(cards);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving cards");
  }
});

app.put("/updateAllCard/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedCard = await Card.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedCard) {
      return res.status(404).json({ message: "Card not found" });
    }

    res.status(200).json({
      message: "Card updated successfully",
      data: updatedCard,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating card" });
  }
});

app.delete("/deleteCard/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCard = await Card.findByIdAndDelete(id);

    if (!deletedCard) {
      return res.status(404).json({ message: "Card not found" });
    }
    res.status(200).json({ message: "Card deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting card" });
  }
});

app.patch("/updateCard/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedCard = await Card.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedCard) {
      return res.status(404).json({ message: "Card not found" });
    }

    res.status(200).json({
      message: "Card updated successfully",
      data: updatedCard,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating card" });
  }
});

app.get("/__endpoints", (req, res) => {
  const routes = [];
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      const methods = Object.keys(middleware.route.methods).map((m) =>
        m.toUpperCase()
      );
      routes.push({ path: middleware.route.path, methods });
    } else if (middleware.name === "router") {
      middleware.handle.stack.forEach((handler) => {
        if (handler.route) {
          const methods = Object.keys(handler.route.methods).map((m) =>
            m.toUpperCase()
          );
          routes.push({ path: handler.route.path, methods });
        }
      });
    }
  });
  res.json(routes);
});
