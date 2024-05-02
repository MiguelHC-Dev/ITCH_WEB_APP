import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  IconButton,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  PowerIcon,
  Bars2Icon,
} from "@heroicons/react/24/solid";
import { useResizeDetector } from 'react-resize-detector';
import { useAuth } from "../context/AuthContext"; // Importa el hook useAuth para acceder a la función de logout


// Definición de items del menú de perfil
const profileMenuItems = [
  {
    label: "Mis Datos",// Texto del menú
    icon: UserCircleIcon,// Ícono del menú
    href: "/mis-datos",// Ruta del menú
    key: "mis-datos",// Clave del menú
  },

  {
    label: "Cerrar Sesión",
    icon: PowerIcon,
    href: "/login",
    key: "cerrar-sesion",

  },
];


// Componente ProfileMenu para manejar el menú de perfil del usuario
function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { logout } = useAuth(); // Usa el hook useAuth para acceder a la función de logout
  const handleMenuClick = (href) => {
    if (href === "/login") {
        logout(); // Cierra la sesión
    } else if (href === "/mis-datos"){
      window.location.href = href; // Redirige a la ruta del menú
    }
};

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">

      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-4 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="md"
            alt="Nombre de ejemplo"
            className="border border-white p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-6 w-6 transition-transform text-white  ${isMenuOpen ? "rotate-180" : ""
              }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, href }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            
              
              
              <button onClick={() => handleMenuClick(href)} key={key} className="block flex w-full text-black hover:bg-gray-200 rounded p-2 border-none">
              {React.createElement(icon, {
                className: `h-4 w-4 mr-4 ${isLastItem ? "text-red-700" : ""}`,
                strokeWidth: 2,
              })}
                
                {label}
              </button>
            
          );
        })}
      </MenuList>
    </Menu>
  );
}



// Definición de los items para el Dropdown del elemento Servicio Social
const ServicioSocialMenuItems = [
  {
    title: "Formatos",
    href: "/formatos",
  },
  {
    title: "Carta Presentación",
    href: "/carta-presentacion",
  },


];





function ServicioSocialMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false); // Nuevo estado para controlar la visibilidad del dropdown

  const { ref: resizeRef } = useResizeDetector(); // Hook para detectar cambios de tamaño


  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen); // Función para alternar el estado del dropdown

  const renderItems = ServicioSocialMenuItems.map(({ title, href }) => ( // Mapeo de los items del dropdown
    <a href={href} key={title} className="block text-white lg:text-black lg:hover:bg-gray-200 rounded hover:bg-blue-800 p-2 border-none">
      {title}
    </a>
  ));

  return (
    <React.Fragment>
      <Menu allowHover open={isMenuOpen} handler={setIsMenuOpen}>
        <MenuHandler>
          <Typography as="a" href="#" variant="small" className="font-normal flex">
            <MenuItem className="hidden items-center gap-2 font-medium text-white lg:flex lg:rounded-full ">
              Servicio Social{" "}
              <ChevronDownIcon
                strokeWidth={2}
                className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
                  }`}
              />
            </MenuItem>

          </Typography>
        </MenuHandler>
        <MenuList className="w-[2rem] overflow-visible lg:grid outline-none">
          <ul className="flex w-full flex-col outline-none">{renderItems}</ul>
        </MenuList>
      </Menu>

      {/* Botón del menú desplegable para la versión móvil */}
      <div ref={resizeRef} className="lg:hidden content-center	">
        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex justify-center items-center gap-2 font-semibold text-xl text-white p-2 w-full">
          Servicio Social{" "}
          <ChevronDownIcon
            strokeWidth={2}
            className={`h-4 w-4 p transition-transform ${isDropdownOpen ? "rotate-180" : ""
              }`}
          />
        </button>
        {/* Contenido del menú desplegable */}

        <div className="w-full">

          <div className={`${isDropdownOpen ? 'block' : 'hidden'} text-xl `}>
            {renderItems}
          </div>
        </div>

      </div>
    </React.Fragment>
  );
}


const ResidenciaMenuItems = [ // Definición de los items para el Dropdown del elemento Residencia
  {
    title: "Ejemplo1",
  },
];



function ResidenciaMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false); // Nuevo estado para controlar la visibilidad del dropdown

  const { ref: resizeRef } = useResizeDetector(); // Hook para detectar cambios de tamaño


  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen); // Función para alternar el estado del dropdown

  const renderItems = ResidenciaMenuItems.map(({ title }) => ( // Mapeo de los items del dropdown
    <a href="#" key={title} className="block text-white lg:text-black lg:hover:bg-gray-200 rounded hover:bg-blue-800 p-2 border-none">
      {title}
    </a>
  ));

  return (
    <React.Fragment>
      <Menu allowHover open={isMenuOpen} handler={setIsMenuOpen}>
        <MenuHandler>
          <Typography as="a" href="#" variant="small" className="font-normal flex">
            <MenuItem className="hidden items-center gap-2 font-medium text-white lg:flex lg:rounded-full ">
              Residencia{" "}
              <ChevronDownIcon
                strokeWidth={2}
                className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
                  }`}
              />
            </MenuItem>

          </Typography>
        </MenuHandler>
        <MenuList className="w-[2rem] overflow-visible lg:grid outline-none">
          <ul className="flex w-full flex-col outline-none">{renderItems}</ul>
        </MenuList>
      </Menu>

      {/* Botón del menú desplegable para la versión móvil */}
      <div ref={resizeRef} className="lg:hidden content-center	">
        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex justify-center items-center gap-2 font-semibold text-xl text-white p-2 w-full">
          Residencia{" "}
          <ChevronDownIcon
            strokeWidth={2}
            className={`h-4 w-4 p transition-transform ${isDropdownOpen ? "rotate-180" : ""
              }`}
          />
        </button>
        {/* Contenido del menú desplegable */}

        <div className="w-full">

          <div className={`${isDropdownOpen ? 'block' : 'hidden'} text-xl `}>
            {renderItems}
          </div>
        </div>

      </div>
    </React.Fragment>
  );
}


const InglesMenuItems = [ // Definición de los items para el Dropdown del elemento Residencia
  {
    title: "Ejemplo2",
  },
];



function InglesMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false); // Nuevo estado para controlar la visibilidad del dropdown

  const { ref: resizeRef } = useResizeDetector(); // Hook para detectar cambios de tamaño


  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen); // Función para alternar el estado del dropdown

  const renderItems = InglesMenuItems.map(({ title }) => ( // Mapeo de los items del dropdown
    <a href="#" key={title} className="block text-white lg:text-black lg:hover:bg-gray-200 rounded hover:bg-blue-800 p-2 border-none">
      {title}
    </a>
  ));

  return (
    <React.Fragment>
      <Menu allowHover open={isMenuOpen} handler={setIsMenuOpen}>
        <MenuHandler>
          <Typography as="a" href="#" variant="small" className="font-normal flex">
            <MenuItem className="hidden items-center gap-2 font-medium text-white lg:flex lg:rounded-full ">
              Inglés{" "}
              <ChevronDownIcon
                strokeWidth={2}
                className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
                  }`}
              />
            </MenuItem>

          </Typography>
        </MenuHandler>
        <MenuList className="w-[2rem] overflow-visible lg:grid outline-none">
          <ul className="flex w-full flex-col outline-none">{renderItems}</ul>
        </MenuList>
      </Menu>

      {/* Botón del menú desplegable para la versión móvil */}
      <div ref={resizeRef} className="lg:hidden content-center	">
        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex justify-center items-center gap-2 font-semibold text-xl text-white p-2 w-full">
          Inglés{" "}
          <ChevronDownIcon
            strokeWidth={2}
            className={`h-4 w-4 p transition-transform ${isDropdownOpen ? "rotate-180" : ""
              }`}
          />
        </button>
        {/* Contenido del menú desplegable */}

        <div className="w-full">

          <div className={`${isDropdownOpen ? 'block' : 'hidden'} text-xl `}>
            {renderItems}
          </div>
        </div>

      </div>
    </React.Fragment>
  );
}



const AdministrarUsuariosMenuItems = [ // Definición de los items para el Dropdown del elemento Residencia
  {
    title: "Estudiantes",
  },
  {
    title: "Personal",
  },
];



function AdministrarUsuariosMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false); // Nuevo estado para controlar la visibilidad del dropdown

  const { ref: resizeRef } = useResizeDetector(); // Hook para detectar cambios de tamaño


  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen); // Función para alternar el estado del dropdown

  const renderItems = AdministrarUsuariosMenuItems.map(({ title }) => ( // Mapeo de los items del dropdown
    <a href="#" key={title} className="block text-white lg:text-black lg:hover:bg-gray-200 rounded hover:bg-blue-800 p-2 border-none">
      {title}
    </a>
  ));

  return (
    <React.Fragment>
      <Menu allowHover open={isMenuOpen} handler={setIsMenuOpen}>
        <MenuHandler>
          <Typography as="a" href="#" variant="small" className="font-normal flex">
            <MenuItem className="hidden items-center gap-2 font-medium text-white lg:flex lg:rounded-full ">
              Administar Usuarios{" "}
              <ChevronDownIcon
                strokeWidth={2}
                className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
                  }`}
              />
            </MenuItem>

          </Typography>
        </MenuHandler>
        <MenuList className="w-[2rem] overflow-visible lg:grid outline-none">
          <ul className="flex w-full flex-col outline-none">{renderItems}</ul>
        </MenuList>
      </Menu>

      {/* Botón del menú desplegable para la versión móvil */}
      <div ref={resizeRef} className="lg:hidden content-center	">
        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex justify-center items-center gap-2 font-semibold text-xl text-white p-2 w-full">
          Inglés{" "}
          <ChevronDownIcon
            strokeWidth={2}
            className={`h-4 w-4 p transition-transform ${isDropdownOpen ? "rotate-180" : ""
              }`}
          />
        </button>
        {/* Contenido del menú desplegable */}

        <div className="w-full">

          <div className={`${isDropdownOpen ? 'block' : 'hidden'} text-xl `}>
            {renderItems}
          </div>
        </div>

      </div>
    </React.Fragment>
  );
}




// Función principal NavList que construye la lista de navegación
function NavList() {
  const isUserAdmin = false; // Aquí deberías determinar si el usuario actual es administrador

  return (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      <ServicioSocialMenu />
      <ResidenciaMenu />
      <InglesMenu />
      {isUserAdmin && <AdministrarUsuariosMenu />}
    </ul>
  );
}


// Componente principal NavbarComplex que ensambla la barra de navegación
export default function NavbarComplex() {
  const [isNavOpen, setIsNavOpen] = React.useState(false); // Estado para manejar la visibilidad de la navegación móvil
  const { ref: resizeRef } = useResizeDetector(); // Hook para detectar cambios de tamaño

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);  // Función para alternar la visibilidad de la navegación móvil

  // Efecto para cerrar la navegación móvil en cambios de tamaño de ventana
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false),
    );
  }, []);

  
  const irHome = () => {

    window.location.href = '/';
  }

  return (
    <Navbar className="mx-auto max-w-screen-xl lg:p-0 p-2 lg:rounded-full lg:pl-6 bg-blue-900">
      <div className="relative mx-auto flex items-center justify-between text-white ">
        <Typography
          as="a"
          href="#"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium hidden lg:block "
        >

          <img onClick={irHome} src="https://www.tecnm.mx/images/tecnm_virtual/tecnm.png" alt="logo" className="h-14 w-16 " />

        </Typography>
        <div className="hidden lg:flex  justify-center w-full">
          <div id="navlist">
            <NavList />
          </div>
        </div>


        <IconButton
          size="md"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className=" mr-2 ml-1 lg:hidden opacity-85	bg-blue-800 hover:bg-blue-800 focus:bg-blue-800 active:bg-blue-800 "
        >
          <Bars2Icon className="h-6 w-6 text-white" />
        </IconButton>


        <ProfileMenu />
      </div>
      <Collapse open={isNavOpen} className="overflow-y-auto">
        {/* Usa resizeRef aquí para detectar cambios de tamaño */}
        <div ref={resizeRef}>
          <NavList />
        </div>
      </Collapse>
    </Navbar>
  );
}