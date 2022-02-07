import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { ListItemButton, Switch } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { ShoppingCart } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/configureStore';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

interface Props {
    handleDarkMode: () => void;
    darkMode: boolean;
}

export default function Navbar({ handleDarkMode, darkMode }: Props) {

    const { basket } = useAppSelector(state => state.basket);
    const basketItemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const handleTest = () => {
        console.log("test");
    }

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        console.log("1");
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        console.log("2");
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        console.log("3");
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        console.log("4");
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <Switch
                    name="loading"
                    color="primary"
                    checked={darkMode}
                    onChange={handleDarkMode}
                />
                <p>{darkMode ? "Dark" : "Light"}</p>
            </MenuItem>
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );


    const leftLinks = [
        { title: 'catalog', path: '/catalog' },
        { title: 'about', path: '/about' },
        { title: 'contact', path: '/contact' }
    ]

    const rightLinks = [
        { title: 'login', path: '/login' },
        { title: 'register', path: '/register' }
    ]

    const navStyles = {
        color: 'inherit',
        typography: 'button',
        '&:hover': {
            color: 'grey.700'
        },
        '&.active': {
            color: 'text.secondary'
        }
    }

    return (<>
        {/*
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
            </Box>
            Objeleri Ortalamak İçin Kullanılabilir.

        */}
        <Box sx={{ flexGrow: 1, marginBottom: 4 }}>
            <AppBar position="static">
                <Toolbar sx={{ overflowX: "auto" }}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                        onClick={handleTest}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 0 }} />
                    <Box sx={{ display: { xs: 'flex' } }}>
                        <ListItemButton
                            component={NavLink}
                            to={'/'}
                            sx={{ ...navStyles, whiteSpace: 'nowrap' }}
                        >
                            eCommerce-UI
                        </ListItemButton>
                    </Box>
                    <Box sx={{ display: { xs: 'none', sm: 'flex', md: 'flex', lg: 'flex' } }}>
                        {leftLinks.map((link) => (
                            <ListItemButton
                                component={NavLink}
                                to={link.path}
                                key={link.path}
                                sx={navStyles}
                            >
                                {link.title.toUpperCase()}
                            </ListItemButton >
                        ))}
                    </Box>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex' } }}>
                        {rightLinks.map((link) => (
                            <ListItemButton
                                component={NavLink}
                                to={link.path}
                                key={link.path}
                                sx={navStyles}
                            >
                                {link.title.toUpperCase()}
                            </ListItemButton >
                        ))}
                    </Box>
                    <Box sx={{ display: { xs: 'none', sm: 'contents', md: 'contents' } }}>
                        <Search sx={{ maxWidth: "150px" }}>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                    </Box>
                    <Box sx={{ display: { xs: 'none', sm: 'none', md: 'contents' } }}>
                        {darkMode ? "Dark" : "Light"}
                        <Switch
                            checked={darkMode}
                            color="primary"
                            onChange={handleDarkMode}
                        />
                        <IconButton component={Link} to='/basket' size="large" aria-label="show 4 new mail" color="inherit">
                            <Badge badgeContent={basketItemCount} color="error">
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={4} color="error">
                                <MailIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                        >
                            <Badge badgeContent={17} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    </>
    );
}
