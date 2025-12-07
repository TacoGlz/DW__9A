import express from "express";
import cors from "cors";
import { connectDB } from "./db.js";
import { Card } from "./models/Cards.js";
const app = express();
app.use(express.json());
app.use(cors());
connectDB();

//Create
app.post("/createCard", async (req, res) => {
  try {
    const card = await Card.create(req.body);
    console.log(card);
    // respond with created card
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

//UPDATE
app.put("/updateEntireCard/:id", async (req, res) => {
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

//DELETE
app.delete("/DeleteCard/:id", async (req, res) => {
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

app.get("/hola", (req, res) => {
  res.status(200).send("¡Hello world from server! :D");
});

app.get("/hello", (req, res) => {
  res.status(200).send("¡Hello world from server! Express :D");
});

app.post("/send", (req, res) => {
  const { user, email } = req.body;
  console.log("Datos Recibidos:" + user + "" + email);

  res.status(200).send("Data received succesfully");
});

app.listen(3000, () => {
  console.log("Server started at http://localhost:3000");
});
app.get("/api/info", async (req, res) => {
  try {
    // Obtener todas las cards para mostrar datos de ejemplo
    const cards = await Card.find().limit(5);

    // Información completa sobre todos los endpoints disponibles
    const apiInfo = {
      message: "API Information - All Endpoints Summary",
      timestamp: new Date().toISOString(),
      baseURL: "http://localhost:3000",

      endpoints: {
        create: {
          "POST /createCard": {
            description: "Create a new card",
            requestBody: "Object with card data",
            successResponse: {
              status: 201,
              body: "Created card object",
              message: "Card created successfully",
            },
            errorResponse: {
              status: 400,
              message: "Error creating card",
            },
          },
        },

        // READ ENDPOINTS
        read: {
          "GET /getAllCards": {
            description: "Get all cards",
            successResponse: {
              status: 200,
              body: "Array of card objects",
            },
            errorResponse: {
              status: 500,
              message: "Error retrieving cards",
            },
          },
          "GET /getCard/:id": {
            description: "Get a specific card by ID",
            parameters: {
              id: "Card ID (MongoDB ObjectId)",
            },
            successResponse: {
              status: 200,
              body: "Card object",
            },
            errorResponses: [
              {
                status: 404,
                message: "Card not found",
              },
              {
                status: 500,
                message: "Error retrieving cards",
              },
            ],
          },
        },

        // UPDATE ENDPOINTS
        update: {
          "PUT /updateEntireCard/:id": {
            description: "Update entire card (replace)",
            parameters: {
              id: "Card ID (MongoDB ObjectId)",
            },
            requestBody: "Complete card object",
            successResponse: {
              status: 200,
              body: {
                message: "Card updated successfully",
                data: "Updated card object",
              },
            },
            errorResponses: [
              {
                status: 404,
                message: "Card not found",
              },
              {
                status: 500,
                message: "Error updating card",
              },
            ],
          },
          "PATCH /updateCard/:id": {
            description: "Partially update card",
            parameters: {
              id: "Card ID (MongoDB ObjectId)",
            },
            requestBody: "Partial card object (fields to update)",
            successResponse: {
              status: 200,
              body: {
                message: "Card updated successfully",
                data: "Updated card object",
              },
            },
            errorResponses: [
              {
                status: 404,
                message: "Card not found",
              },
              {
                status: 500,
                message: "Error updating card",
              },
            ],
          },
        },

        // DELETE ENDPOINTS
        delete: {
          "DELETE /DeleteCard/:id": {
            description: "Delete a card by ID",
            parameters: {
              id: "Card ID (MongoDB ObjectId)",
            },
            successResponse: {
              status: 200,
              body: {
                message: "Card deleted successfully",
              },
            },
            errorResponses: [
              {
                status: 404,
                message: "Card not found",
              },
              {
                status: 500,
                message: "Error deleting card",
              },
            ],
          },
        },

        // OTHER ENDPOINTS
        other: {
          "GET /hola": {
            description: "Spanish greeting endpoint",
            successResponse: {
              status: 200,
              body: "¡Hello world from server! :D",
            },
          },
          "GET /hello": {
            description: "English greeting endpoint",
            successResponse: {
              status: 200,
              body: "¡Hello world from server! Express :D",
            },
          },
          "POST /send": {
            description: "Receive user data",
            requestBody: {
              user: "Username",
              email: "User email",
            },
            successResponse: {
              status: 200,
              body: "Data received successfully",
            },
          },
        },
      },

      sampleData: {
        totalCards: cards.length,
        cards: cards,
      },
      statistics: {
        totalEndpoints: 9,
        byMethod: {
          GET: 4,
          POST: 3,
          PUT: 1,
          PATCH: 1,
          DELETE: 1,
        },
        byCategory: {
          CRUD: 6,
          Utility: 3,
        },
      },
    };

    res.status(200).json(apiInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error retrieving API information",
      error: error.message,
    });
  }
});
