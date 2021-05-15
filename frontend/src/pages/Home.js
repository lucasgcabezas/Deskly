const Home = () => {
    return (
        <>
            <div className="contenedorHome">
                <div className="contenedorHeroHome">
                    <div>
                        <div className="desklyLogo" style={{ backgroundImage: "url('https://webdesing881317710.files.wordpress.com/2021/05/desklylogo.png')" }}></div>
                        <h1>DESKLY</h1>
                    </div>
                    <p>Organiza y gestiona tu trabajo de forma eficiente. Lleva un control de cada proyecto. Hace que tu carga fluya.</p>
                </div>
                <div className="imageHero" style={{ backgroundImage: "url('https://webdesing881317710.files.wordpress.com/2021/05/s.png')" }}></div>
            </div>
            <div>
                <div className="div2">
                    <h2>Libera tu espacio mental </h2>
                    <div className="hands" style={{ backgroundImage: "url('https://webdesing881317710.files.wordpress.com/2021/05/6bcf4f9e-7b00-412f-b336-3b6241b86cb3.png')" }}></div>
                    <div className="fraseHero2">
                        <div class="circulo"></div>
                        <p>Recupera la claridad y la calma sacando todas esas tareas de tu cabeza y poniéndolas en Deskly (sin importar dónde estés o qué dispositivo utilices).</p>
                    </div>
                </div>
                <svg>
                    <clipPath id="wave" clipPathUnits="objectBoundingBox">
                        <path class="st0" d="M1,0c0,0-0.3,0.1-0.5,0.1S0.3,0,0,0.1V1h1L1,0z" />
                    </clipPath>
                </svg>
                <div className="contenedorSemiCirculo">
                    <div className="elipse"><h2>DESKLY Herramientas</h2></div>
                </div>
                <div className="contenedorCirculosHerramientas">
                    <div className="desklyHerramientas1">
                        <div>
                            <span class="material-icons-outlined">dashboard</span>
                            <h3>Boards:</h3>
                            <p>Te permite ver el panorama general</p>
                        </div>
                        <div>
                            <span class="material-icons-outlined">add</span>
                            <h3>Add:</h3>
                            <p>Podrás capturar y organizar las tareas en segundos</p>
                        </div>
                        <div>
                            <span class="material-icons-outlined">task_alt</span>
                            <h3>Tasks:</h3>
                            <p>Retrata cómo los pequeños pasos se suman hasta llegar a grandes logros</p>
                        </div>
                    </div>
                    <div className="desklyHerramientas2">
                        <div>
                            <span class="material-icons-outlined">edit</span>
                            <h3>Edit:</h3>
                            <p>Si te has confundido, puedes editar todas tus tareas tantas veces como necesites</p>
                        </div>
                        <div>
                            <span class="material-icons-outlined">delete</span>
                            <h3>Delete:</h3>
                            <p>Desecha cualquier contenido que ya no uses con un solo clic</p>
                        </div>
                    </div>
                </div>
                <div className="contenedorElipse2">
                    <div className="elipse2"></div>
                    <div className="contenedorSemiCirculo">
                        <div className="fabrica" style={{ backgroundImage: "url('https://webdesing881317710.files.wordpress.com/2021/05/1f4f68b7-593b-4377-80e6-d661aade7263.png')" }}></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;