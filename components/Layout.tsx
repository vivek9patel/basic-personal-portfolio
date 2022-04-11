import Header from './Header'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='h-screen w-screen flex flex-col'>
      <Header />
      {children}
    </div>
  )
}