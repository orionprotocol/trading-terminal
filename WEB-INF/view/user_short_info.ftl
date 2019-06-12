<#if user.subscription??>
    <#assign sb = user.subscription>
<table class="info">
    <tr>
        <td>Дата начала</td>
        <td>${sb.startDateString}</td>
    </tr>
    <tr>
        <td>Дата окончания</td>
        <td>${sb.endDateString}</td>
    </tr>
</table>
    <#if sb.PC??>
        <#assign pc = sb.PC>
        <#include "pc.ftl">
    </#if>
<#else>
<div class="has-error">
    <h3>Подписка неактивна</h3>
</div>
</#if>