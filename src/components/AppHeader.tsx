import "../assets/css/AppHeader.css"
import UploadButton from "./UploadButton"
import { useAuth } from "../context/AuthContext"
import { Button } from "antd"


function AppHeader() {
  const { logout, isAuthenticated } = useAuth();
  // Destructure the logout function from the AuthContext
  const handleLogout = async () => {

    // Get the logout function from the context
    try {
      const reponse = await logout();
      if (reponse?.success === true) {
        // Handle successful logout (e.g., redirect to login page, show a message)
        console.log('Logout successful');
        window.location.href = '/login'; // Redirect to login page
      } else {
        console.error('Logout failed:', reponse?.error);
        // Handle error (e.g., show an error message)
      }
    } catch (error) {
      console.error('Logout failed:', error);
      // Handle error (e.g., show an error message)
    }
  }

  // Only show logout button if authenticated
  const buttons = isAuthenticated ? (
    //  style={{ border: ' solid 1px black', background: 'transparent', display: 'flex', height: "100%", color: 'black' }}
    <>
      <UploadButton />
      <Button type="primary" onClick={handleLogout}>
        Logout
      </Button>
    </>
  ) : null;

  return (
    <header>
      <h1 className='text-black'>Harris Personal Media Server</h1>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'flext-start' }}>
        {buttons}
      </div>
    </header>
  )
}

export default AppHeader