import { logoutAccount } from '@/lib/actions'
import Image from 'next/image'
import { redirect, useRouter } from 'next/navigation'
import React from 'react'

const Footer = ({user, type}: FooterProps) => {

    const router = useRouter()

    const handleLogout = async () => {
        const loggedOut = await logoutAccount()
        if(loggedOut) 
            router.push('/sign-in')
    }

  return (
    <section className='flex items-center justify-between gap-2 py-6'>
        <div className={type === 'sidebar' 
        ? 'flex size-10 items-center justify-center rounded-full bg-gray-200 max-xl:hidden' 
        : 'flex size-10 items-center justify-center rounded-full bg-gray-200'}>
            <p className='text-xl font-bold text-gray-700'>
                {user?.firstName[0]}
            </p>
        </div>

        <div className={type === 'sidebar' 
        ? 'flex flex-1 flex-col justify-center max-xl:hidden' 
        : 'flex size-10 items-center justify-center rounded-full bg-gray-200'}>
            <h1 className='text-14 truncate font-semibold text-gray-700'>
                {user?.firstName}
            </h1>
            <p className='text-14 truncate font-normal text-gray-600'>
                {user?.email}
            </p>
        </div>
        
        <div className={type === 'sidebar' 
        ?'relative size-5 max-xl:w-full max-xl:flex max-xl:justify-center max-xl:items-center cursor-pointer' 
        : 'relative size-5 cursor-pointer'}
        onClick={() => handleLogout()}
        >
            <Image 
            src={'/icons/logout.svg'}
            fill 
            alt='Logout'
            />
        </div>
    </section>
  )
}

export default Footer