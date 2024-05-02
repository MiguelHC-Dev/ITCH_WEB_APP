import React from 'react'
import NavbarComplex from '../NavbarComplex'
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
  Dialog,
} from "@material-tailwind/react";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";

 

 
const TABLE_HEAD = ["Nombre", "No. control", "",""]; //los campos vaciós son para editar y eliminar usuarios
 
const TABLE_ROWS = [
  
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
    numero_control: "20520929",
    nombre: "Miguel Angel Hernandez Corona",
    servicio: true,
    residencia: true,
    ingles: false,   
  },

  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
    numero_control: "20520929",
    nombre: "Miguel Angel Hernandez Corona",
    servicio: true,
    residencia: true,
    ingles: false,   
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
    numero_control: "20520929",
    nombre: "Miguel Angel Hernandez Corona",
    servicio: true,
    residencia: true,
    ingles: false,   
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
    numero_control: "20520929",
    nombre: "Miguel Angel Hernandez Corona",
    servicio: true,
    residencia: true,
    ingles: false,   
  },

];
 
export function TablaDeUsuarios() {
  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-0 flex items-center justify-between gap-8">
          <div>
          <h1 className="text-2xl font-semibold text-blue-900 ">Administrar Estudiantes</h1>

            
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            
            <Button className="flex items-center gap-3" size="sm">
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Registrar Estudiante
            </Button>
          </div>
        </div>
       
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full  min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(
              ({ img, numero_control, nombre, servicio, residencia, ingles }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
 
                return (
                  <tr key={nombre}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar src={img} alt={nombre} size="sm" />
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {nombre}
                          </Typography>
                        
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {numero_control}
                        </Typography>
                       
                      </div>
                    </td>
                    
                   
                    <td className={classes}>
                      <Tooltip content="Edit User">
                        <IconButton variant="text">
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}










export default function AdminUsuarios() {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  return (
    <div>
      <NavbarComplex />
      <section className='mt-10'>
        
        <TablaDeUsuarios />

      </section>

      <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                <Card className="mx-auto w-full max-w-[24rem]">
                    <CardBody className="flex flex-col gap-4">
                        <Typography variant="h4" color="blue-gray">
                            Registro de Estudiante
                        </Typography>

                        <Typography className="-mb-3" variant="h6">
                            Nombre del documento
                        </Typography>
                        <Input label="Documento" size="lg" />

                        
                        

                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button variant="gradient" onClick={handleOpen} fullWidth>
                            Registrar Estudiante
                        </Button>


                    </CardFooter>
                </Card>
            </Dialog>

    </div>
  )
}

