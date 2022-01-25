import React, {useState} from 'react'
import Logo from '../../Components/Utilis/Logo'

//Drawer width
const DRAWER_WIDTH = 240

const ResponsiveDrawer = (props) => {
    const { windows } = props
    const [mobileIsOpen, setMobileIsOpen] = useState(false)

    const handleDrawerToggle = () => {
        setMobileIsOpen(!mobileIsOpen)
    }

    const drawer = (
        <div>
            <Toolbar>
            
            </Toolbar>
        </div>
    )
}

function Navigation() {
    return (
        <div>
            
        </div>
    )
}

export default Navigation
