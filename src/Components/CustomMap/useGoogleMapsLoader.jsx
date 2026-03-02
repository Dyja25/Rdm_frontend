// import { useState, useEffect } from 'react';
// import { Loader } from '@googlemaps/js-api-loader';

// const useGoogleMapsLoader = (apiKey, libraries = '') => {
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const loader = new Loader({
//       apiKey,
//       libraries: libraries.split(','),
//     });

//     loader
//       .load()
//       .then(() => setIsLoaded(true))
//       .catch((err) => {
//         console.error('Google Maps API failed to load:', err);
//         setError(err.message);
//       });
//   }, [apiKey, libraries]);

//   return { isLoaded, error };
// };

// export default useGoogleMapsLoader;


import { useState, useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const useGoogleMapsLoader = (apiKey, libraries = '') => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // ✅ If no API key, skip loading
    if (!apiKey) {
      setIsLoaded(false);
      return;
    }

    const loader = new Loader({
      apiKey,
      libraries: libraries ? libraries.split(',') : [],
      id: '__googleMapsScriptId', // ✅ keep consistent id
    });

    loader
      .load()
      .then(() => setIsLoaded(true))
      .catch((err) => {
        console.error('Google Maps API failed to load:', err);
        setError(err.message);
      });
  }, [apiKey, libraries]);

  return { isLoaded, error };
};

export default useGoogleMapsLoader;
