
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const Information = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">Informações</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">Esta seção exibirá informações gerais do sistema.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="dark:bg-gray-700">
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-2 dark:text-white">Documentação</h3>
            <p className="text-gray-600 dark:text-gray-300">Acesse a documentação completa do sistema.</p>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-700">
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-2 dark:text-white">Suporte</h3>
            <p className="text-gray-600 dark:text-gray-300">Entre em contato com nossa equipe de suporte.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Information;
