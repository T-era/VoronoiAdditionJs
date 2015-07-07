//===============================================
// SVG Inject
//===============================================

var cameraShadow = "<svg class='flat_icon' xmlns='http://www.w3.org/2000/svg' width='100px' height='100px' viewBox='0 0 100 100' ><path class='circle' d='M50,2.125c26.441,0,47.875,21.434,47.875,47.875S76.441,97.875,50,97.875C17.857,97.875,2.125,76.441,2.125,50S23.559,2.125,50,2.125z'/><g class='icon'><path class='base' d='M75.707,75.279H24.293c-2.839,0-5.141-2.303-5.141-5.143V39.289c0-2.556,1.87-4.659,4.313-5.058l-0.028-0.084c0,0,0.331,0,0.856,0l0,0h4.285c11.14,0,7.712-9.426,15.424-9.426c2.57,0,5.998,0,5.998,0s3.428,0,5.998,0c7.712,0,4.285,9.426,15.424,9.426h4.284l0,0c0.526,0,0.856,0,0.856,0l-0.027,0.084c2.443,0.398,4.313,2.502,4.313,5.058v30.848C80.85,72.977,78.546,75.279,75.707,75.279z'/><path class='strip' d='M19.152,48.715h61.696v17.138H19.152V48.715z'/><path class='lens' d='M50.001,41.86c8.519,0,15.424,6.904,15.424,15.423c0,8.52-6.905,15.426-15.424,15.426c-8.518,0-15.424-6.906-15.424-15.426C34.576,48.764,41.482,41.86,50.001,41.86z'/><path class='lens_inner' d='M50.001,46.144c6.151,0,11.14,4.987,11.14,11.139s-4.986,11.141-11.14,11.141c-6.153,0-11.14-4.986-11.14-11.141C38.861,51.133,43.848,46.144,50.001,46.144z'/><path class='flash' d='M44.859,27.864h10.284c1.795,0,3.428,4.284,3.428,4.284c0,1.42-1.151,2.569-2.571,2.569H44.003c-1.42,0-2.571-1.149-2.571-2.569C41.432,32.148,43.063,27.864,44.859,27.864z'/><path class='red' d='M73.708,36.717c1.42,0,2.571,1.151,2.571,2.571c0,1.421-1.151,2.57-2.571,2.57c-1.419,0-2.571-1.149-2.571-2.57C71.137,37.869,72.289,36.717,73.708,36.717z'/><path class='button' d='M25.722,31.578h3.428c1.419,0,2.57,1.15,2.57,2.57h-8.569C23.151,32.728,24.302,31.578,25.722,31.578z'/></g></svg>"
$(cameraShadow).appendTo('.shadow-camera');

var folderShadow = "<svg class='flat_icon' xmlns='http://www.w3.org/2000/svg' width='100px' height='100px' viewBox='0 0 100 100' ><path class='circle' d='M50,2.125c26.441,0,47.875,21.434,47.875,47.875S76.441,97.875,50,97.875C17.857,97.875,2.125,76.441,2.125,50S23.559,2.125,50,2.125z'/><g class='icon'><path class='back' d='M67.715,70.502c0,2.516-2.038,4.555-4.556,4.555H30.51c-2.516,0-4.555-2.041-4.555-4.555V29.499c0-2.516,2.039-4.555,4.555-4.555h6.834c9.871,0,6.833,6.075,18.224,6.075c4.556,0,12.148,0,12.148,0L67.715,70.502L67.715,70.502z'/><path class='paper_back' d='M27.828,34.56h44.04v39.483h-44.04V34.56z'/><path class='paper_front' d='M29.602,38.356h44.798v35.687H29.602V38.356z'/><path class='front' d='M73.491,75.057H30.212c-1.96,0-3.615-1.244-4.26-2.979c0.439,0.863,2.465,1.461,3.5,1.461c1.519,0,3.037-1.52,3.037-4.557V43.167h45.559v27.334C78.048,73.016,76.008,75.057,73.491,75.057z'/></g></svg>"
$(folderShadow).appendTo('.shadow-folder');

var pictureShadow = "<svg class='flat_icon' xmlns='http://www.w3.org/2000/svg' width='100px' height='100px' viewBox='0 0 100 100' ><path class='circle' d='M50,2.125c26.441,0,47.875,21.434,47.875,47.875S76.441,97.875,50,97.875C17.857,97.875,2.125,76.441,2.125,50S23.559,2.125,50,2.125z'/><g class='icon'><path class='back' d='M23.236,32.68l41.281-11.062c1.221-0.327,2.477,0.397,2.804,1.618l11.062,41.279c0.327,1.223-0.397,2.478-1.618,2.805L35.483,78.382c-1.221,0.327-2.477-0.397-2.804-1.618L21.618,35.484C21.29,34.262,22.015,33.007,23.236,32.68z'/><path class='front' d='M28.631,26.343h42.736c1.264,0,2.29,1.024,2.29,2.289v42.736c0,1.265-1.025,2.289-2.29,2.289H28.631c-1.264,0-2.29-1.024-2.29-2.289V28.632C26.342,27.367,27.367,26.343,28.631,26.343z'/><path class='sky' d='M30.158,29.395h39.684c0.422,0,0.764,0.342,0.764,0.765v39.684c0,0.423-0.342,0.765-0.764,0.765H30.158c-0.421,0-0.763-0.342-0.763-0.765V30.159C29.395,29.736,29.736,29.395,30.158,29.395z'/><path class='sun' d='M39.062,35.342c2.529,0,4.579,2.051,4.579,4.579c0,2.529-2.05,4.579-4.579,4.579s-4.579-2.05-4.579-4.579C34.483,37.393,36.534,35.342,39.062,35.342z'/><path class='mountain' d='M29.395,70.033l10.59-16.188c0.535-0.834,1.402-0.834,1.937,0l3.549,5.536l9.875-15.399c0.763-1.192,2.003-1.192,2.766,0c0,0,11.314,23.861,12.494,25.789c-0.003,0.388,0.046,0.834-0.443,0.834C67.2,70.672,35.549,70.6,30.036,70.593C29.526,70.593,29.395,70.033,29.395,70.033z'/></g></svg>"
$(pictureShadow).appendTo('.shadow-picture');

var trashShadow = "<svg class='flat_icon' xmlns='http://www.w3.org/2000/svg' width='100px' height='100px' viewBox='0 0 100 100' ><path class='circle' fill='' d='M50,2.125c26.441,0,47.875,21.434,47.875,47.875c0,26.441-21.434,47.875-47.875,47.875C17.857,97.875,2.125,76.441,2.125,50C2.125,23.559,23.559,2.125,50,2.125z'/><g class='icon'><path class='base' fill='' d='M72.201,38.16v32.561c0,2.452-1.988,4.44-4.441,4.44H32.241c-2.452,0-4.44-1.988-4.44-4.44V38.16H72.201z'/><path class='details' fill='' d='M40.381,41.861c-0.817,0-1.481,0.661-1.481,1.48V69.98c0,0.817,0.663,1.48,1.481,1.48c0.816,0,1.48-0.661,1.48-1.48v-26.64C41.861,42.522,41.198,41.861,40.381,41.861z M59.621,41.861c-0.816,0-1.48,0.661-1.48,1.48V69.98c0,0.817,0.664,1.48,1.48,1.48s1.48-0.661,1.48-1.48v-26.64C61.102,42.522,60.438,41.861,59.621,41.861z M50.001,41.861c-0.817,0-1.481,0.661-1.481,1.48V69.98c0,0.817,0.663,1.48,1.481,1.48c0.816,0,1.48-0.661,1.48-1.48v-26.64C51.481,42.522,50.817,41.861,50.001,41.861z'/><path class='lid' fill='' d='M24.1,38.16L24.1,38.16c0-2.453,1.987-4.441,4.441-4.441H38.9v-4.44c0-2.452,1.988-4.439,4.44-4.439h13.32c2.453,0,4.441,1.987,4.441,4.439v4.44h10.359c2.451,0,4.439,1.988,4.439,4.441l0,0H24.1z M57.4,32.24v-1.48c0-1.226-0.996-2.22-2.219-2.22H44.82c-1.226,0-2.219,0.994-2.219,2.22v1.48v1.48H57.4V32.24z'/></g></svg>"
$(trashShadow).appendTo('.shadow-trash');
