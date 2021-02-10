export const validSquaredImage = (image) => {

    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.readAsDataURL(image);

        reader.onload = (e) => {
        const image = new Image ();

        image.src = e.target.result;

        image.onload = () => {
            const width = image.width;

            const height = image.height;

            if( width / height > 1.1) {
                return reject("A imagem não é quadrada");
            }
            resolve()
        }
    }
    })

    

}