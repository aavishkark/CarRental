import React from 'react';
import {
  Box,
  Flex,
  Link,
  Button,
  useDisclosure,
  textDecoration,
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useDispatch } from 'react-redux';
import { postLogout } from '../Redux/authReducer/action';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent
} from '@chakra-ui/react'
import { authReducer } from '../Redux/authReducer/reducer';
import { useSelector } from 'react-redux';
const Navbar = () => {
  const user1=useSelector((store)=>{return store.authReducer.user})
  const user = JSON.parse(localStorage.getItem('user'));
  const auth = JSON.parse(localStorage.getItem('rentaride'));
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const handleLogout = () => {
    onClose()
    dispatch(postLogout());
  };
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [placement, setPlacement] = React.useState('right')
  return (
    <Box bg="#004aad" p={4}>
      <Flex align="center" justify="space-between">
        <Box>
          <Link as={RouterLink} to="/">
            <img src="./LOGO.png" alt="Logo" width="40%" />
          </Link>
        </Box>

        <Box display={{ base: 'block', md: 'none' }}>
          <Button
            backgroundColor="transparent"
            border="1px"
            onClick={onOpen}
          >
            <div style={{ color: 'white' }}>☰</div>
          </Button>
        </Box>

        <Box
          display={{ base: 'none', md: 'flex' }}
          width={{ base: 'full', md: 'auto' }}
          justifyContent={"space-around"}
          flexGrow={1}
          color={"white"}
        >
          <Link as={RouterLink}  to="/" marginRight="2" _hover={{textDecoration:"none",color: "teal.100",borderRadius:"5px"}}>
            Home
          </Link>
          <Link as={RouterLink} to="/likes" marginRight="2" _hover={{textDecoration:"none",color: "teal.100",borderRadius:"5px"}}>
            Likes
          </Link>
          <Link as={RouterLink} to='/cars' marginRight="2" _hover={{textDecoration:"none",color: "teal.100",borderRadius:"5px"}}>
            Cars
          </Link>
          {auth && (
              <Link
                as={RouterLink}
                to="/profile"
                marginRight="2"
                display="flex"
                _hover={{textDecoration:"none",color: "teal.100",borderRadius:"5px"}}
              >
                Profile
                {/* <AccountCircleIcon />
                {`${user.username}`} */}
              </Link>
          )}
          {auth && (
              <Link
                as={RouterLink}
                to="/"
                marginRight="2"
                onClick={handleLogout}
                _hover={{textDecoration:"none",color: "teal.100",borderRadius:"5px"}}
              >
                Logout
              </Link>
          )}
          {!auth && (
            <Link as={RouterLink} to="/login" marginRight="2" _hover={{textDecoration:"none",color: "teal.100",borderRadius:"5px"}}>
              Log In
            </Link>
          )}
        </Box>
      </Flex>

      <Drawer placement={placement} onClose={onClose} isOpen={isOpen} >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px' bg={"#004aad"}></DrawerHeader>
          <DrawerBody bg={"#004aad"} color={"white"}>
            <p><Link as={RouterLink} onClick={onClose} to="/" marginRight="2"  _hover={{textDecoration:"none",color: "teal.100",borderRadius:"5px"}}>
            Home
          </Link></p>
            <p> <Link as={RouterLink} onClick={onClose} to="/likes" marginRight="2"  _hover={{textDecoration:"none",color: "teal.100",borderRadius:"5px"}}>
            Likes
          </Link></p>
            <p> <Link as={RouterLink} onClick={onClose} to="/cars" marginRight="2"  _hover={{textDecoration:"none",color: "teal.100",borderRadius:"5px"}}>
            Cars
          </Link></p>
          <p>
          {auth && (
              <Link
              onClick={onClose}
                as={RouterLink}
                to="/profile"
                marginRight="2"
                display="flex"
                _hover={{textDecoration:"none",color: "teal.100",borderRadius:"5px"}}
              >
                Profile
              </Link>
          )}
          </p>
          <p>
          {auth && (
              <Link
                as={RouterLink}
                to="/"
                marginRight="2"
                onClick={handleLogout}
                _hover={{textDecoration:"none",color: "teal.100",borderRadius:"5px"}}
              >
                Logout
              </Link>
          )}
          {!auth && (
            <Link as={RouterLink} onClick={onClose} to="/login" marginRight="2" _hover={{textDecoration:"none",color: "teal.100",borderRadius:"5px"}}>
              Log In
            </Link>
          )}
          </p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navbar;
