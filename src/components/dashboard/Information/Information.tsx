
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Clock, Building2, Phone, Mail, MapPin, Save } from "lucide-react";
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
    <div className="w-full h-full py-8 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-serif tracking-tight mb-2 text-gray-900 dark:text-gray-50">Informações do Negócio</h1>
        <p className="text-base text-gray-600 dark:text-gray-400 mb-8 font-light">
          Personalize seu sistema com as informações do seu negócio
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6 bg-white dark:bg-gray-800/50 p-8 rounded-lg border border-gray-100 dark:border-gray-800">
            <div className="grid gap-6 md:gap-8">
              <div className="space-y-2">
                <Label htmlFor="businessName" className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium">
                  <Building2 className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  Nome do Negócio
                </Label>
                <Input
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  placeholder="Informe o nome do seu negócio"
                  className="border-gray-200 dark:border-gray-700 text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="operatingHours" className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium">
                  <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  Horário de Funcionamento
                </Label>
                <Input
                  id="operatingHours"
                  name="operatingHours"
                  value={formData.operatingHours}
                  onChange={handleChange}
                  placeholder="Ex: Segunda a Sexta, 09:00 - 18:00"
                  className="border-gray-200 dark:border-gray-700 text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium">
                  <Phone className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  Telefone de Contato
                </Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="(00) 00000-0000"
                  className="border-gray-200 dark:border-gray-700 text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium">
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
                  className="border-gray-200 dark:border-gray-700 text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium">
                  <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  Endereço
                </Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Rua, número, bairro, cidade - Estado"
                  className="border-gray-200 dark:border-gray-700 text-sm"
                />
              </div>
            </div>
          </div>
          
          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full sm:w-auto font-medium tracking-wide bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              <Save className="h-4 w-4 mr-2" />
              Salvar Informações
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Information;
