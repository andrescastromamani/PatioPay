import { Sidebar } from '../components/Sidebar';

export const Home = () => {
    return (
        <div className="">
            <button className="btn btn-dark" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebar" aria-controls="offcanvasWithBackdrop"><i className="fa-solid fa-bars"></i></button>
            <Sidebar />
            <h1 className="text-center">Inicio</h1>
        </div>
    )
}
