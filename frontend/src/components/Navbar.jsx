import { useDispatch, useSelector } from 'react-redux'
import { signOut } from "../redux/UserReducer"
import axios from "axios"
import { Link } from 'react-router-dom'
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from '@headlessui/react'
import { MenuIcon, UserIcon, XIcon } from 'lucide-react/dist/cjs/lucide-react';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Navbar = () => {
    const navigation = [
        { name: 'Home', link: '/' },
        { name: 'About', link: '/about' },
        { name: 'Community Chat', link: '/chat' },
        { name: 'Journal Entry', link: '/journal' },
        { name: 'Meditation', link: '/meditate' }
    ]

    const dispatch = useDispatch()
    const currentUser = useSelector(state => state?.user?.currentUser)
    console.log(currentUser);
    return (
        <div className="min-h-full">
            <Disclosure as="nav" className="bg-gray-900 backdrop-blur-lg mx-auto">
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-7xl px-2 md:px-4 lg:px-8">
                            <div className="flex h-20 items-center justify-between">
                                <div className='text-4xl text-white mx-4'>Nirvana</div>
                                <div className="flex items-center">
                                    <div className="hidden md:block">
                                        <div className="ml-4 flex items-baseline space-x-4">
                                            {navigation.map((item) =>
                                            (<Link
                                                key={item.name}
                                                to={item.link}
                                                className={"text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg p-2 text-sm font-medium flex items-center"}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </Link>
                                            )
                                            )}
                                            {
                                                currentUser ?
                                                    <button onClick={() => {
                                                        axios
                                                            .get("/api/v1/user/logout")
                                                            .then(() => dispatch(signOut()))
                                                    }} to="/user/authenticate" className="bg-white text-black px-2 py-1 hover:scale-105 ml-4 rounded-md font-medium transition-all duration-300">
                                                        Logout
                                                    </button>
                                                    :
                                                    <Link to="/user/authenticate" className="bg-white text-black px-2 py-1 hover:scale-105 ml-4 rounded-md font-medium transition-all duration-300">
                                                        Sign In
                                                    </Link>
                                            }
                                        </div>
                                    </div>
                                </div>

                                <div className="hidden md:block">
                                    <div className="ml-4 flex items-center cursor-pointer">
                                        {/* Profile dropdown */}
                                        <UserIcon className="text-white rounded-full border border-white h-8 w-8" />
                                    </div>
                                </div>
                                <div className="-mr-2 flex md:hidden">
                                    {/* Mobile menu button */}
                                    <DisclosureButton className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </DisclosureButton>
                                </div>
                            </div>
                        </div>

                        <DisclosurePanel className="md:hidden">
                            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                                {navigation.map((item) =>
                                (<Link key={item.name}
                                    to={item.link}
                                >
                                    <DisclosureButton
                                        key={item.name}
                                        as="a"
                                        className={classNames(
                                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'block rounded-md px-3 py-2 text-base font-medium'
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </DisclosureButton>
                                </Link>
                                )
                                )}
                            </div>
                        </DisclosurePanel>
                    </>
                )}
            </Disclosure>
        </div>
    );
}
export default Navbar;
