import Header from './components/header'
import Sidebar from './components/sidebar'
import MainContent from './components/main-content'
import PatientInfo from './components/patient-info'

export default function Dashboard() {
  return (
    <div className="flex flex-col h-screen w-full">
      <Header />
      <div className="flex flex-1 overflow-hidden w-[1920px]">
        <Sidebar />
        {/* <MainContent /> */}
         {/* <PatientInfo patient/>  */}
      </div>
    </div>
  )
}
