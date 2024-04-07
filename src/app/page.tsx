import Navbar from '@/app/components/Navbar'
import Image from 'next/image'
import Link from 'next/link'
import FieldSection from '@/app/components/FieldSection'

export default function Home() {
  return (
    <main>
      <Navbar/>
      <FieldSection/>
    </main>
  )
}
