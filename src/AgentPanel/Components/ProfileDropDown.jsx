import React from 'react'
import { CiUser } from 'react-icons/ci';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { TbPasswordFingerprint } from 'react-icons/tb';

export const ProfileDropDown = () => {
    const dummyProfilePic ="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxEQDw8QEBAQDg8PDw0PDQ0QDQ8NDw0PFhEWFhURExMYHSggGBolGxMTITEhJSk3Li4uFx8zODMsNygtLisBCgoKDQ0NDg0NDysZFRkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAwQBAgUGB//EADAQAQACAAMFBgYCAwEAAAAAAAABAgMEESExQVFxBRJhgZHBIjJSobHRovATQuFy/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD7iAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANZxI5tf8ANHP7SCQR/wCaP7EsxiRzBuMRLIAAAAAAAAAAAAAAAAAAAMWtpvBlpfEiP0hvizO7ZCMEtsaeiOZYEAAAAGYlvXFmPFGAs1xYnwSKTemJMeMclFoa0tE7mwAAAAAAAAAAAAAMWnTaDF7aK1rTO8vbWWqAAAAAAAEAAAAAM1nTcs4d9evFVZrOm0Fwa0trDZQAAAAAAAAAAVsa+s6cITYttIVQAEAABpjY0UjWfKOMmNiRWszPDhznk5OJiTadZ3/gE2LnLTu+GPDf6oJnXft67WBUIlPhZu9ePejlO37oAHWwMxF92yeMJXFraYnWNkxul1ctjd+uvGNkx4oqUAAAG+HfSfDitKSxgW2acvwolAAAAAAAAAkFfHtt6ImZlhAAAABz+0cTW0V4RtnrKolzU/Hb/wBTHoiVAAAABYyOJpeI4W2T7K7NZ0mJ5TEg7QywigADfCtpMejQBdGKTrEMqAAAAAADXEnZLZHj/LPl+QVgEAAAAHJzddL266+u1Evdo4e63lPsoqgAAAA2w662iOcxH3arXZ+FrbvcK/kHSYBFAAAAWcCdiRFl909fZKoAAAAAAI8f5Z8vykaYsbJBVAQAAAAYtWJiYnbE73LzGBNJ5xwl1WLViY0mNYngDii9i5D6Z08J/aC2UvH+uvSYlUQCaMrf6fvEJ8LIfVPlH7BVwcKbzpHnPCHWwsOKxERw+/izSkVjSI0hlFAAAAAAWMvunr7JUeBGxIoAAAAAAMTDICnLCTGrpPXajQAAAQ5jMxTZvnlHuCYmXLxM1e3HSOUbEEyo7XejnHqd6OcerigO13o5x6nejnHq4oDtxI4iXDzN67p18J2wDrCvl83Ftk/DP2nosIAAANsOuswCzSNIhsCgAAAAAAACPGrrHRWXVXFppPhO4GgMXtpEzO6I1QQZzMd2NI+aftHNzJbXvNpmZ3y1VAAAAAAAABfyWZ1+G2//AFnn4KBE6bt/AHbGmBid6sT69W6KLGBXjzQ0rrOi3EKAAAAAAAAAADW9dY0bAKdo02KvaFtKac5iPf2dPEpr14S5XakaRWPGQc8AQAAAAAAAAABf7NtstHKYn++i7EOf2Z81unu7GFh6dfwKzh00jx4twAAAAAAAAAAAAAQ5nL1xI0t5TxhMA8/msnbD37a8LRu8+Su9RMKGY7MrbbX4J5b6+nAHGFjGyWJTfXWOdfihXEAAAAATYOUvfdWdOc7IBCmy+WtiT8MbONp3Q6OX7LiNt570/TGyv/XQrWIjSI0iN0RsgVBlMpXDjZttO+3P9LAAAAAAAAAAAAAAAAAAAAI8TArb5qxPjMRr6pAFO/ZmHPCY6Wn3Rz2TT6rfx/ToAOdHZNPqt/H9JK9mYcfVPW36XQEWHlqV3ViPHTWfVKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/9k=";

  return (
  
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-4 z-50">
          {/* User Info */}
          <div className="px-4 pb-4 border-b">
            <div className="flex items-center space-x-3">
              <img
                src={dummyProfilePic} // replace with actual user image
                alt="profile"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="text-lg font-semibold">Beni</h3>
                <p className="text-sm text-gray-500">beni@mail.com</p>
              </div>
            </div>
          </div>

          {/* Menu Options */}
          <div className="mt-2">
            <button
              onClick={() => navigate('/my-profile')}
              className="flex gap-2 items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              <CiUser size={24} />  My Profile
            </button>
            <button
              onClick={() => navigate('/subscription')}
              className="flex gap-2 items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
             <TbPasswordFingerprint size={24} /> Change Password
            </button>
           
            <button
              onClick={() => {
                // handle logout
                setIsOpenHeader(false);
                // add your logout logic
                navigate('/login');
              }}
              className="flex gap-2 items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 mt-2 border-t"
            >
              <RiLogoutCircleRLine size={24}/> Logout
            </button>
          </div>
        </div>
      
  )
}
