// Copyright (c) 2015 - 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import test from 'tape-catch';
import {generateLayerTests, testLayer} from '@deck.gl/test-utils';
import {TileLayer} from '@deck.gl/geo-layers';
import {tileToBoundingBox} from '@deck.gl/geo-layers/tile-layer/utils/tile-util';
import {getTileIndices} from '@deck.gl/geo-layers/tile-layer/utils/viewport-util';

test('TileLayer', t => {
  const testCases = generateLayerTests({
    Layer: TileLayer,
    assert: t.ok,
    onBeforeUpdate: ({testCase}) => t.comment(testCase.title)
  });
  testLayer({Layer: TileLayer, testCases, onError: t.notOk});
  t.end();
});

test('TileLayer#updateTriggers', t => {
  const testCases = [
    {
      props: {
        getTileData: 0
      },
      onAfterUpdate({layer}) {
        t.equal(
          layer.state.tileset._tileToBoundingBox,
          tileToBoundingBox,
          'Should create a tileCache with correct tileToBoundingBox'
        );
        t.equal(
          layer.state.tileset._getTileIndices,
          getTileIndices,
          'Should create a tileCache with correct _getTileIndices'
        );
      }
    }
  ];

  testLayer({Layer: TileLayer, testCases, onError: t.notOk});

  t.end();
});
