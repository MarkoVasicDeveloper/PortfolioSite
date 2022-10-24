import * as THREE from 'three';

export function path() {
        let ax = 22.5;
        const radius = [22, 18, 22, 62];
        let pointsArray = [];

        for (let i = 0; i < 4; i ++) {
            const curve = new THREE.EllipseCurve(
                i === 3 ? 62.5 : ax,  0,
                radius[i], radius[i],
                0,  Math.PI,
                i % 2 === 0 ? false : true,
                0
            );

            const points = i !== 3 ? curve.getPoints( 300 ).reverse() : curve.getPoints( 900 );
            pointsArray = [...pointsArray, ...points];
            ax += 40;
        }

        return pointsArray;
    }