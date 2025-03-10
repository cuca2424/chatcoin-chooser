
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Clock, Building2, Phone, Mail, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Information = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    businessName: '',
    operatingHours: '',
    phoneNumber: '',
    email: '',
    address: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    
    toast({
      title: "Informações salvas",
      description: "Os dados do seu negócio foram salvos com sucesso.",
    });
  };

  return (
    <div className="max-w-3xl mx-auto py-6 px-4 sm:px-6">
      <h2 className="text-2xl font-medium mb-6 text-gray-800 dark:text-gray-100">Informações do Negócio</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Preencha os dados abaixo para personalizar seu sistema com as informações do seu negócio.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="border-0 shadow-sm dark:bg-gray-800">
          <CardContent className="pt-6">
            <div className="space-y-5">
              <div className="grid grid-cols-1 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="businessName" className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                    <Building2 className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    Nome do Negócio
                  </Label>
                  <Input
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    placeholder="Informe o nome do seu negócio"
                    className="border-gray-200 dark:border-gray-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="operatingHours" className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                    <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    Horário de Funcionamento
                  </Label>
                  <Input
                    id="operatingHours"
                    name="operatingHours"
                    value={formData.operatingHours}
                    onChange={handleChange}
                    placeholder="Ex: Segunda a Sexta, 09:00 - 18:00"
                    className="border-gray-200 dark:border-gray-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                    <Phone className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    Telefone de Contato
                  </Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="(00) 00000-0000"
                    className="border-gray-200 dark:border-gray-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                    <Mail className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="contato@seudominio.com"
                    className="border-gray-200 dark:border-gray-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                    <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    Endereço
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Rua, número, bairro, cidade - Estado"
                    className="border-gray-200 dark:border-gray-700"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-end">
          <Button type="submit" className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600">
            <Send className="h-4 w-4" />
            Salvar Informações
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Information;
