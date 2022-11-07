export let cameraLookAt = [0,0,0];

let counter = 0;

export function moveCamera(e, camera, points) {
        const position = points;

        if(counter === points.length - 2) counter = 0;
        if(counter < 0) return;

        if(e.deltaY > 0) {
            camera.position.set(points[counter].x, 3, -(points[counter].y));
            camera.lookAt(points[counter + 2].x, 3, -(points[counter + 2].y));
            counter += 1;
        }

        if(e.deltaY < 0) {
            if(counter < 2) counter = points.length - 2;
            camera.position.set(points[counter - 2].x, 3, -(points[counter - 2].y));
            camera.lookAt(points[counter].x, 3, -(points[counter].y));
            counter -= 1;
        }
    }