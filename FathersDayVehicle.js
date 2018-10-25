function Vehicle(x, y) {
	this.pos = createVector(x, y);
	this.vel = createVector(0, 0);
	this.acc = createVector(0, 0);
	this.maxspeed = 2;
	this.maxforce = 0.3;
	this.worldRecord;

	this.update = function () {
		this.pos.add(this.vel);
		this.vel.add(this.acc);
		this.acc.mult(0);
	}

	this.history = function (distance) {
		noFill();
		stroke(decideColor());
		strokeWeight(4);

		if (distance < CONTACT_DISTANCE) {
			var v = this.pos.copy();
			if (drawCount > numRepeats) {
				fill(255);
				// Get everything by getting double the range
				ellipse(v.x, v.y, CONTACT_DISTANCE * 2);
			} else {
				noFill();
				point(v.x, v.y);
			}
		}
	}

	this.seek = function (target) {

		// A vector pointing from the object to the target
		var desired = p5.Vector.sub(target, this.pos);
		desired.setMag(this.maxspeed);

		// A vector that enables steering
		var steer = p5.Vector.sub(desired, this.vel);
		steer.setMag(this.maxforce);

		this.acc = steer;
	}

	this.eat = function (list, vehiclelist) {
		var finalClosest = null;
		this.worldRecord = Infinity;

		for (var i = 0; i < list.length; i++) {
			this.d = p5.Vector.dist(list[i], this.pos);

			if (this.d < this.worldRecord) {
				this.worldRecord = this.d;
				finalClosest = list[i];
			}

			if (finalClosest) {
				var seek = this.seek(finalClosest)
				this.applyForce(seek);
			}

			if (list.length < 1) {
				vehiclelist.splice(i, 1);
			}

			if (this.d < 10) {
				list.splice(i, 1);

				if (drawCount <= numRepeats) {
					eraseList.push(createVector(this.pos.copy().x, this.pos.copy().y));
				}
			}
		}
	}

	this.getWorldRecord = function () {
		return this.worldRecord;
	}

	this.applyForce = function (force) {
		this.acc.add(force);
	}

	this.show = function () {
		noStroke();
		fill(0, 120, 240);
		ellipse(this.pos.x, this.pos.y, 20, 20);
	}
}
