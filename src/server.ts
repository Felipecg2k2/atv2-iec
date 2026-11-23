import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';
import sequelize from './config/database.js';
import './models/alien.model.js';
import alienRoutes from './routes/alien.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Rota de Health Check exigida pelo Render e pela AT2
app.get('/api/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    versao: '1.0.2',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(alienRoutes);

const PORT = Number(process.env.PORT) || 3000;

try {
  await sequelize.authenticate();
  await sequelize.sync();

  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Documentação API em http://localhost:${PORT}/api-docs/`);
  });
} catch (error) {
  console.error('Erro ao iniciar a aplicação:', error);
  process.exit(1);
}
