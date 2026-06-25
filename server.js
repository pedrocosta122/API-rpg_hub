import app from "./app.js";
import { connectDB } from "./src/config/database.js";

const PORT = process.env.PORT;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}/catalogue`)
    });
}).catch((error) => {
    console.error('Falha ao conectar ao servidor');
    process.exit(1);
});
