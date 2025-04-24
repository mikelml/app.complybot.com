// src/lib/tools.ts
import { Tool } from 'ai';

export const tools: Tool[] = [
  {
    name: 'buscarProveedorRiesgo',
    description: 'Busca proveedores según industria o categoría de riesgo',
    parameters: {
      type: 'object',
      properties: {
        categoria: {
          type: 'string',
          description: 'Categoría de riesgo o industria',
        },
      },
      required: ['categoria'],
    },
    async execute({ categoria }) {
      // lógica de búsqueda aquí
      return {
        resultados: [
          { nombre: 'Proveedor A', riesgo: 9 },
          { nombre: 'Proveedor B', riesgo: 7 },
        ],
      };
    },
  },
];