
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, Clock, Save } from "lucide-react";
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
      address,
      operatingHours: formattedSchedules,
    });
    
    toast({
      title: "Informações salvas",
      description: "Os dados do seu negócio foram salvos com sucesso.",
    });
  };

  return (
    <div className="w-full h-full bg-background flex flex-col items-center overflow-auto">
      <div className="w-full max-w-4xl px-4 py-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold tracking-tight mb-6 text-gray-900 dark:text-gray-50">
          Informações do Negócio
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Business Name */}
          <div className="space-y-2">
            <Label htmlFor="businessName" className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium text-base">
              <Building2 className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              Nome do Negócio
            </Label>
            <Input
              id="businessName"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="Informe o nome do seu negócio"
              className="border-gray-200 dark:border-gray-700"
            />
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address" className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium text-base">
              <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              Endereço
            </Label>
            <Input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Rua, número, bairro, cidade - Estado"
              className="border-gray-200 dark:border-gray-700"
            />
          </div>

          {/* Operating Hours */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium text-base">
              <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              Horário de Funcionamento
            </Label>
            
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {schedules.map((schedule, index) => (
                <div key={schedule.day} className="flex flex-col bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{schedule.day}</span>
                    <Select
                      value={schedule.isOpen ? "open" : "closed"}
                      onValueChange={(value) => handleScheduleChange(index, "isOpen", value === "open")}
                    >
                      <SelectTrigger className="h-8 w-28">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="open">Aberto</SelectItem>
                        <SelectItem value="closed">Fechado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {schedule.isOpen && (
                    <div className="flex gap-2 items-center">
                      <Input
                        type="time"
                        value={schedule.open}
                        onChange={(e) => handleScheduleChange(index, "open", e.target.value)}
                        className="h-8"
                      />
                      <span className="text-gray-500">até</span>
                      <Input
                        type="time"
                        value={schedule.close}
                        onChange={(e) => handleScheduleChange(index, "close", e.target.value)}
                        className="h-8"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center pt-2">
            <Button 
              type="submit" 
              className="w-48 font-medium text-base tracking-wide bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              <Save className="h-4 w-4 mr-2" />
              Enviar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Information;
