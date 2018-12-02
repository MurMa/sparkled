package io.sparkled.renderer.fill.function

import io.sparkled.model.animation.easing.Easing
import io.sparkled.model.animation.easing.EasingTypeCode
import io.sparkled.model.animation.effect.Effect
import io.sparkled.model.animation.effect.EffectTypeCode
import io.sparkled.model.animation.fill.Fill
import io.sparkled.model.animation.fill.FillTypeCode
import io.sparkled.model.animation.param.Param
import io.sparkled.model.animation.param.ParamName
import io.sparkled.util.RenderUtils
import io.sparkled.util.matchers.SparkledMatchers.hasRenderedFrames
import org.hamcrest.MatcherAssert.assertThat
import org.junit.jupiter.api.Test
import kotlin.intArrayOf as f

class GradientFillTest {

    @Test
    fun can_render_soft_gradient_flash() {
        val effect = Effect()
            .setType(EffectTypeCode.FLASH)
            .setEasing(Easing().setType(EasingTypeCode.LINEAR))
            .setFill(
                Fill()
                    .setType(FillTypeCode.GRADIENT)
                    .setParams(
                        listOf(
                            Param().setName(ParamName.COLORS).setValue(listOf("#ff0000", "#0000ff", "#00ff00")),
                            Param().setName(ParamName.BLEND_HARDNESS).setValue(0f)
                        )
                    )
            )

        val renderedStagePropData = RenderUtils.render(effect, 11, 10)

        assertThat(
            renderedStagePropData, hasRenderedFrames(
                f(0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000),
                f(0x330000, 0x29000A, 0x1F0014, 0x14001F, 0x0A0029, 0x000033, 0x000A29, 0x00141F, 0x001F14, 0x00290A),
                f(0x660000, 0x520014, 0x3D0029, 0x29003D, 0x140052, 0x000066, 0x001452, 0x00293D, 0x003D29, 0x005214),
                f(0x990000, 0x7A001F, 0x5C003D, 0x3D005C, 0x1F007A, 0x000099, 0x001F7A, 0x003D5C, 0x005C3D, 0x007A1F),
                f(0xCC0000, 0xA30029, 0x7A0052, 0x52007A, 0x2900A3, 0x0000CC, 0x0029A3, 0x00527A, 0x007A52, 0x00A329),
                f(0xFF0000, 0xCC0033, 0x990066, 0x660099, 0x3300CC, 0x0000FF, 0x0033CC, 0x006699, 0x009966, 0x00CC33),
                f(0xCC0000, 0xA30029, 0x7A0052, 0x52007A, 0x2900A3, 0x0000CC, 0x0029A3, 0x00527A, 0x007A52, 0x00A329),
                f(0x990000, 0x7A001F, 0x5C003D, 0x3D005C, 0x1F007A, 0x000099, 0x001F7A, 0x003D5C, 0x005C3D, 0x007A1F),
                f(0x660000, 0x520014, 0x3D0029, 0x29003D, 0x140052, 0x000066, 0x001452, 0x00293D, 0x003D29, 0x005214),
                f(0x330000, 0x29000A, 0x1F0014, 0x14001F, 0x0A0029, 0x000033, 0x000A29, 0x00141F, 0x001F14, 0x00290A),
                f(0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000)
            )
        )
    }

    @Test
    fun can_render_medium_gradient_flash() {
        val effect = Effect()
            .setType(EffectTypeCode.FLASH)
            .setEasing(Easing().setType(EasingTypeCode.LINEAR))
            .setFill(
                Fill()
                    .setType(FillTypeCode.GRADIENT)
                    .setParams(
                        listOf(
                            Param().setName(ParamName.COLORS).setValue(listOf("#ff0000", "#0000ff", "#00ff00")),
                            Param().setName(ParamName.BLEND_HARDNESS).setValue(50f)
                        )
                    )
            )

        val renderedStagePropData = RenderUtils.render(effect, 11, 10)

        assertThat(
            renderedStagePropData, hasRenderedFrames(
                f(0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000),
                f(0x330000, 0x330000, 0x24000F, 0x08002B, 0x000033, 0x000033, 0x000033, 0x000F24, 0x002B08, 0x003300),
                f(0x660000, 0x660000, 0x48001F, 0x0F0057, 0x000066, 0x000066, 0x000066, 0x001E48, 0x00570F, 0x006600),
                f(0x990000, 0x990000, 0x6B002E, 0x170082, 0x000099, 0x000099, 0x000099, 0x002E6B, 0x008217, 0x009900),
                f(0xCC0000, 0xCC0000, 0x8F003E, 0x1E00AE, 0x0000CC, 0x0000CC, 0x0000CC, 0x003D8F, 0x00AE1E, 0x00CC00),
                f(0xFF0000, 0xFF0000, 0xB3004D, 0x2600D9, 0x0000FF, 0x0000FF, 0x0000FF, 0x004CB3, 0x00D926, 0x00FF00),
                f(0xCC0000, 0xCC0000, 0x8F003E, 0x1E00AE, 0x0000CC, 0x0000CC, 0x0000CC, 0x003D8F, 0x00AE1E, 0x00CC00),
                f(0x990000, 0x990000, 0x6B002E, 0x170082, 0x000099, 0x000099, 0x000099, 0x002E6B, 0x008217, 0x009900),
                f(0x660000, 0x660000, 0x48001F, 0x0F0057, 0x000066, 0x000066, 0x000066, 0x001E48, 0x00570F, 0x006600),
                f(0x330000, 0x330000, 0x24000F, 0x08002B, 0x000033, 0x000033, 0x000033, 0x000F24, 0x002B08, 0x003300),
                f(0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000)
            )
        )
    }

    @Test
    fun can_render_hard_gradient_flash() {
        val effect = Effect()
            .setType(EffectTypeCode.FLASH)
            .setEasing(Easing().setType(EasingTypeCode.LINEAR))
            .setFill(
                Fill()
                    .setType(FillTypeCode.GRADIENT)
                    .setParams(
                        listOf(
                            Param().setName(ParamName.COLORS).setValue(listOf("#ff0000", "#0000ff", "#00ff00")),
                            Param().setName(ParamName.BLEND_HARDNESS).setValue(100f)
                        )
                    )
            )

        val renderedStagePropData = RenderUtils.render(effect, 11, 10)

        assertThat(
            renderedStagePropData, hasRenderedFrames(
                f(0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000),
                f(0x330000, 0x330000, 0x330000, 0x000033, 0x000033, 0x000033, 0x000033, 0x000033, 0x003300, 0x003300),
                f(0x660000, 0x660000, 0x660000, 0x000066, 0x000066, 0x000066, 0x000066, 0x000066, 0x006600, 0x006600),
                f(0x990000, 0x990000, 0x990000, 0x000099, 0x000099, 0x000099, 0x000099, 0x000099, 0x009900, 0x009900),
                f(0xCC0000, 0xCC0000, 0xCC0000, 0x0000CC, 0x0000CC, 0x0000CC, 0x0000CC, 0x0000CC, 0x00CC00, 0x00CC00),
                f(0xFF0000, 0xFF0000, 0xFF0000, 0x0000FF, 0x0000FF, 0x0000FF, 0x0000FF, 0x0000FF, 0x00FF00, 0x00FF00),
                f(0xCC0000, 0xCC0000, 0xCC0000, 0x0000CC, 0x0000CC, 0x0000CC, 0x0000CC, 0x0000CC, 0x00CC00, 0x00CC00),
                f(0x990000, 0x990000, 0x990000, 0x000099, 0x000099, 0x000099, 0x000099, 0x000099, 0x009900, 0x009900),
                f(0x660000, 0x660000, 0x660000, 0x000066, 0x000066, 0x000066, 0x000066, 0x000066, 0x006600, 0x006600),
                f(0x330000, 0x330000, 0x330000, 0x000033, 0x000033, 0x000033, 0x000033, 0x000033, 0x003300, 0x003300),
                f(0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000)
            )
        )
    }
}
