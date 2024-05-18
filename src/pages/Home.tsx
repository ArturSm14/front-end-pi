import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"


function Home() {
    const [date, setDate] = React.useState<Date>()

//    const onSubimit = (data : Event) => {
//       alert(JSON.stringify(data));  
//    }
  return (
   
    <form className="space-y-6">
                  <div className="grid grid-cols-6 items-center text-right gap-3">
                    <Label htmlFor="name">Nome</Label>
                    <Input className="col-span-3"></Input>
                  </div>

                  <div className="grid grid-cols-6 items-center text-right gap-3">
                    <Label htmlFor="name">Medico</Label>
                    <Input className="col-span-3"></Input>
                  </div>

                  <div className="grid grid-cols-6 items-center text-right gap-3">
                    <Label htmlFor="name">Clínica</Label>
                    <Select>
                      <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Clinicas"/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Clinica Sim</SelectItem>
                        <SelectItem value="dark">Clinica Unifametro</SelectItem>
                        <SelectItem value="system">Unimed Clinica</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-6 items-center text-right gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input className="col-span-3"></Input>
                  </div>

                  <div className="grid grid-cols-6 items-center text-right gap-3">
                    <Label htmlFor="email">Data da Consulta</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Selecione uma Data</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                    </Popover>
                  </div>

                    <Button type="submit">Salvar</Button>
                  
                </form>
  )
}

export default Home