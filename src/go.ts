import "source-map-support/register";
import { assert } from "typia";

function CorrectStackTrace() {
    try {
        throw new Error("just an error");
    } catch (e) {
        console.log("CorrectStackTrace: " + (e as Error).stack);
    }
}

function WrongStackTrace() {
    try {
        assert<number>("sdf");
    } catch (e) {
        console.log("WrongStackTrace: " + (e as Error).stack);
    }
}

CorrectStackTrace();
console.log("-");
WrongStackTrace();
