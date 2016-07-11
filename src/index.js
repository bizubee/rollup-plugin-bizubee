
import {parse, parseString} from 'bizubee-compiler'
import utilityText from './bizubee-utilities'

const UTILS = 'bizubee utils';

export default function bizubee(options = {}) {
	var hasResolver = !!options.getResolver;
	if (hasResolver)
		var resolver = options.getResolver();

	return {
		name: 'bizubee',
		resolveId(importee, importer) {
			if (importee === UTILS) {
				return importee;
			} else {
				if (hasResolver) {
					const id = resolver.resolveId(importee, importer);
					if (id === UTILS) {
						throw new Error('Invalid ID!');
					} else {
						return id;
					}
				} else {
					return null;
				}
			}
		},
		load(id) {
			if (id === UTILS) {
				return utilityText;
			} else {
				if (hasResolver) {
					return resolver.load(id);
				} else {
					return null;
				}
			}
		},
		transform(code, id) {
			if (id === UTILS)
				return code;
			else {
				if (id.endsWith('.bz')) {
					return {code: parse(code)};
				} else {
					return null;
				}
			}
		}
	}
}