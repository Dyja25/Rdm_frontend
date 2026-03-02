import React, { Component } from "react";

class ProgressiveImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImage: this.props.preview, // Start with the low-res preview
      loading: true,
    };
    this.imageRef = React.createRef(); // Reference to the image element
  }

  componentDidMount() {
    this.observeImage();
  }

  componentWillUnmount() {
    if (this.observer) {
      this.observer.disconnect(); // Cleanup observer
    }
  }

  observeImage = () => {
    // Fallback for older browsers
    if (!("IntersectionObserver" in window)) {
      this.loadHighResImage(this.props.image);
      return;
    }

    const options = {
      root: null, // Use the viewport as the root
      rootMargin: "100px", // Preload the image 100px before it enters the viewport
      threshold: 0, // Trigger as soon as the image starts to appear
    };

    this.observer = new IntersectionObserver(this.handleIntersection, options);
    if (this.imageRef.current) {
      this.observer.observe(this.imageRef.current);
    }
  };

  handleIntersection = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Load the high-resolution image once the image enters the viewport
        this.loadHighResImage(this.props.image);
        this.observer.disconnect(); // Stop observing once loaded
      }
    });
  };

  loadHighResImage = async (imageSrc) => {
    try {
      const highResImage = await this.compressImage(imageSrc);
      this.setState({ currentImage: highResImage, loading: false });
      

    
    } catch (error) {
      console.error("Failed to load high-res image:", error);
    }
  };


//   loadHighResImage = async (imageSrc) => {
//   try {
//     let srcToUse = imageSrc;

//     // ✅ If props.token exists, fetch with Authorization header
//     if (this.props.token) {
//       const response = await fetch(imageSrc, {
//         headers: {
//           Authorization: `Bearer ${this.props.token}`,
//         },
//       });
//       if (!response.ok) throw new Error("Failed to fetch image with token");

//       const blob = await response.blob();
//       srcToUse = URL.createObjectURL(blob);
//     }

//     const highResImage = await this.compressImage(srcToUse);
//     this.setState({ currentImage: highResImage, loading: false });
//   } catch (error) {
//     console.error("Failed to load high-res image:", error);
//   }
// };




  compressImage = (imageSrc) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous"; // Allow cross-origin images
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Dynamically scale the image to fit container size
        const scaleFactor = 2; // Scale down factor
        canvas.width = Math.min(img.width, 1920) / scaleFactor; // Limit width
        canvas.height = (canvas.width / img.width) * img.height;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(URL.createObjectURL(blob));
            } else {
              reject(new Error("Image compression failed"));
            }
          },
          "image/webp", // WebP format for smaller size
          0.8 // Compression quality
        );
      };

      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = imageSrc;
    });
  };

  style = (loading) => ({
    transition: loading ? "none" : "0.5s filter linear",
    filter: loading ? "blur(10px)" : "none", // Blur effect for low-res image
    width: this.props.width || "100%",
    height: this.props.height || "100%",
    borderRadius: this.props.borderRadius || 0,
    objectFit: this.props.objectFit || "cover",
  });

  render() {
    const { currentImage, loading } = this.state;
    const { alt } = this.props;

    return (
      <img
        ref={this.imageRef}
        src={currentImage}
        alt={alt || "Image"}
        loading="lazy" // Native lazy loading for browsers
        style={this.style(loading)}
      />
    );
  }
}

export default ProgressiveImage;