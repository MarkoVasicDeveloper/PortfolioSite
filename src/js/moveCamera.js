export let cameraLookAt = [0,0,0];

let counter = 0;

export function moveCamera(e, camera, points) {
        const position = points;

        if(counter === points.length - 1) counter = 0;
        if(counter < 0) return;

        if(e.deltaY > 0) {
            camera.position.set(points[counter].x, 3, -(points[counter].y));
            camera.lookAt(points[counter + 1].x, 3, -(points[counter + 1].y));
            cameraLookAt = [points[counter + 1].x, 3, -(points[counter + 1].y)];
            counter += 1;
        }

        if(e.deltaY < 0) {
            if(counter < 1) counter = points.length - 1;
            camera.position.set(points[counter - 1].x, 3, -(points[counter - 1].y));
            camera.lookAt(points[counter].x, 3, -(points[counter].y));
            cameraLookAt = [points[counter].x, 3, -(points[counter].y)];
            counter -= 1;
        }
    }