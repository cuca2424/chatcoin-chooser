
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Building2, Clock, MapPin, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const daysOfWeek = [
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
  "Domingo",
];

type ScheduleItem = {
  day: string;
  open: string;
  close: string;
  isOpen: boolean;
};

const Information = () => {
  const { toast } = useToast();
  const [businessName, setBusinessName] = useState('');
  const [address, setAddress] = useState('');
  const [schedules, setSchedules] = useState<ScheduleItem[]>(
    daysOfWeek.map((day) => ({
      day,
      open: "09:00",
      close: "18:00",
      isOpen: day !== "Domingo",
    }))
  );

  const handleScheduleChange = (index: number, field: keyof ScheduleItem, value: string | boolean) => {
    const updatedSchedules = [...schedules];
    updatedSchedules[index] = {
      ...updatedSchedules[index],
      [field]: value,
    };
    setSchedules(updatedSchedules);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formattedSchedules = schedules
      .filter(s => s.isOpen)
      .map(s => `${s.day}: ${s.open} - ${s.close}`)
      .join('\n');
    
    console.log('Form data submitted:', {
      businessName,
      operatingHours: formattedSchedules,
      address,
    });
    
    toast({
      title: "Informações salvas",
      description: "Os dados do seu negócio foram salvos com sucesso.",
    });
  };

  return (
    <div className="w-full h-full py-8 px-6 bg-background overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold tracking-tight mb-2 text-gray-900 dark:text-gray-50">Informações do Negócio</h1>
        <p className="text-base text-gray-600 dark:text-gray-400 mb-8">
          Personalize seu sistema com as informações essenciais do seu negócio
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="space-y-8">
            <div className="space-y-4">
              <Label htmlFor="businessName" className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium text-base">
                <Building2 className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                Nome do Negócio
              </Label>
              <Input
                id="businessName"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Informe o nome do seu negócio"
                className="border-gray-200 dark:border-gray-700 text-base"
              />
            </div>

            <div className="space-y-4">
              <Label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium text-base">
                <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                Horário de Funcionamento
              </Label>
              
              <div className="space-y-4 pl-6">
                {schedules.map((schedule, index) => (
                  <div key={schedule.day} className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-4 md:col-span-3">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{schedule.day}</span>
                    </div>
                    
                    <div className="col-span-4 md:col-span-3">
                      <Select
                        value={schedule.isOpen ? "open" : "closed"}
                        onValueChange={(value) => handleScheduleChange(index, "isOpen", value === "open")}
                      >
                        <SelectTrigger className="h-9 text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="open">Aberto</SelectItem>
                          <SelectItem value="closed">Fechado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {schedule.isOpen && (
                      <>
                        <div className="col-span-2 md:col-span-3">
                          <Input
                            type="time"
                            value={schedule.open}
                            onChange={(e) => handleScheduleChange(index, "open", e.target.value)}
                            className="h-9 text-sm"
                          />
                        </div>
                        <div className="col-span-2 md:col-span-3">
                          <Input
                            type="time"
                            value={schedule.close}
                            onChange={(e) => handleScheduleChange(index, "close", e.target.value)}
                            className="h-9 text-sm"
                          />
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Label htmlFor="address" className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium text-base">
                <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                Endereço
              </Label>
              <Input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Rua, número, bairro, cidade - Estado"
                className="border-gray-200 dark:border-gray-700 text-base"
              />
            </div>
          </div>
          
          <div className="pt-6 pb-10">
            <Button 
              type="submit" 
              className="w-full sm:w-auto font-medium text-base tracking-wide bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600"
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
