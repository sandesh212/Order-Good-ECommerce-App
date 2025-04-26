import React from 'react'
import UserMenu from '../../components/layout/UserMenu'
import Layout from '../../components/layout/Layout'

function Profile() {
  return (
    <>
    <Layout title={"Dashboard - Profile"}>
    <div className='containter-fluid m-3 p-3'>
    <div className='row'>
      <div className='col-md-3'>
         <UserMenu />
      </div>
      <div className='col-md-9'>
        <h1>Profile</h1>
      </div>
    </div>
    </div>
    </Layout>
    </>
  )
}

export default Profile