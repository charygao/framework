FamousFramework.component('famous-demos:lightbox:additional-detail', {
    behaviors: {
        '$self' : {
            size: [300, 600],
            'position' : '[[identity]]',
            'opacity' : '[[identity]]'
        },
        '.additional-detail-title' : {
            'position-x' : '[[identity|titlePositionX]]',
            content: function(englishTitle, spanishTitle) {
                return `
                    <span class="lightbox-title">${englishTitle}</span>
                    <span class="lightbox-spanish-title">${spanishTitle}</span>
                `
            }
        },
        '.additional-detail-info' : {
            'position-x' : '[[identity|infoPositionX]]',
            'position-y' : 100,
            content: function(index, dimensions) {
                return `
                    <span class="lightbox-tag-title"> SERIES </span>
                    <br>
                    <span class="lightbox-tag-content">Capricho ${index}</span>
                    <br>
                    <span class="lightbox-tag-title"> ARTIST </span>
                    <br>
                    <span class="lightbox-tag-content">Francisco Goya y Lucientes (Spain, Fuendetodos, 1746-1828)</span>
                    <br>
                    <span class="lightbox-tag-title"> DATE</span>
                    <br>
                    <span class="lightbox-tag-content">Spain, 1799</span>
                    <br>
                    <span class="lightbox-tag-title"> SIZE </span>
                    <br>
                    <span class="lightbox-tag-content">${dimensions}</span>
                `
            }
        }
    },
    events: {
        '$lifecycle' : {
            'post-load' : function($state) {
                $state.set('opacity', 0);
            }
        },
        '$self' : {
            'additional-detail-position' : function($state, $payload) {
                var outPosition = [
                    $payload.totalSize[0],
                    $payload.centerPosition[1]  + 25
                ];
                var inPosition = [
                    $payload.centerPosition[0] + $payload.modalSize[0] + 25,
                    $payload.centerPosition[1] + 25
                ];
                $state.set('outPosition', outPosition);
                $state.set('position', outPosition.slice());
                $state.set('inPosition', inPosition);
            }
        },
        '$public' : {
            'animate-in' : function($state) {
                $state.set('opacity', 1);
                $state.set('position', $state.get('inPosition'), {duration: 300});
            },
            'animate-out' : function($state) {
                $state.set('position',  $state.get('outPosition'), {duration: 300})
                    .thenSet('opacity', 0);
            },
            'set-data' : function($state, $payload) {
                $state.set('englishTitle', $payload.englishTitle);
                $state.set('spanishTitle', $payload.spanishTitle);
                $state.set('index', $payload.index);
                $state.set('dimensions', $payload.dimensions);
            }
        }
    },
    states: {
        inPosition: null,
        outPosition: null,
        titlePositionX: 0,
        infoPositionX: 0,

        englishTitle: 'Francisco Goya y Lucientes, painter',
        spanishTitle: 'Francisco Goya y Lucientes, pintor',
        index: 1,
        dimensions: '21.5 \u00d7 15.3 cm (8.5 \u00d7 6 in). (print)/ 30,6 x 20,1 cm. (paper)'
    },
    tree: `
        <node class='additional-detail-title'></node>
        <node class='additional-detail-info'></node>
    `
})
.config({
    includes: ['additional-detail.css']
});